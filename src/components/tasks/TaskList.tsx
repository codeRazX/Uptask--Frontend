import { useMemo } from "react"
import TaskCard from "./TaskCard"
import { STATUS_TASK, STATUS_BORDER_COLOR } from "@/utils/index"
import DropTask from "./DropTask"
import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateStatus } from "@/api/taskApi"
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import type { Project, TaskDashboard, TaskStatusType } from "@/types/index"

type TaskListProps = {
  tasks: TaskDashboard[],
  hasAuthorization: boolean
}
type GrupedTasks = Record<string, TaskDashboard[]>


export default function TaskList({tasks, hasAuthorization} : TaskListProps) {
  

  const queryClient = useQueryClient()
  const params = useParams()
  const projectId = params.projectId!
  
  const groupTasks = useMemo<GrupedTasks>(() => {
    const freshGroup: GrupedTasks = {
      pending: [],
      inProgress: [],
      onHold: [],
      underReview: [],
      completed: []
    };

    tasks.forEach(task => {
      freshGroup[task.status] = [...freshGroup[task.status], task];
    });

    return freshGroup;
  }, [tasks]);

   const {mutate} = useMutation({
    mutationFn: updateStatus,
    onMutate: async (data) => {
      const previousProject = queryClient.getQueryData<Project>(['project', data.projectId])

      if (previousProject) {
      const updatedTasks = previousProject.tasks.map((task) =>
        task._id === data.taskId ? { ...task, status: data.status } : task
      )

      queryClient.setQueryData(['project', data.projectId], {
        ...previousProject,
        tasks: updatedTasks
      })
      }

      return { previousProject }
    },
    onError: handleOnErrorMutation,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['task', variables.taskId] })
      toast.success(data, {className: 'border border-lime-400', toastId: data})
    }
  })

  const handleDragEnd = (e: DragEndEvent) => {
    const {over, active} = e
    
    if (over && over.id && active.id){
      const taskId = active.id.toString()
      const status = over.id as TaskStatusType
      const data = {projectId, taskId, status}
      mutate(data)
    } 
  }
 
  return (
    <>
      <h2 className="text-5xl font-black my-10">Tasks</h2>

       <div className='flex gap-5 overflow-x-scroll scroll-smooth snap-x lg:snap-none 2xl:overflow-auto pb-32'>

        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupTasks).map(([status, tasks]) => (
            <div key={status} className='min-w-[300px] snap-start 2xl:min-w-0 2xl:w-1/5'>
              <h3 className={`text-left sm:text-center capitalize font-medium bg-white p-2 border border-slate-300 border-t-8 ${STATUS_BORDER_COLOR[status as TaskStatusType] }`}>{STATUS_TASK[status as TaskStatusType]}</h3>

              <DropTask status={status}/>

              <ul className='mt-5 space-y-5'>
                {!tasks.length ? (
                  <li className="text-gray-500 text-center pt-3">There are no tasks</li>
                ) : (
                  tasks.map(task => <TaskCard key={task._id} task={task} hasAuthorization={hasAuthorization} />)
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  )
}
