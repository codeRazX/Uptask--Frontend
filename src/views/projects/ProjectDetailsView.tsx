import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { getProjectById } from "@/api/projectApi";
import { deleteTask } from "@/api/taskApi";
import ConfirmDelete from "@/components/ConfirmDelete";
import Spinner from "@/components/Spinner";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskModal from "@/components/tasks/EditTaskModal";
import TaskList from "@/components/tasks/TaskList";
import { handleInternalError, isManager } from "@/utils/index";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ModalViewTask from "@/components/tasks/ModalViewTask";
import useAuth from "@/hooks/useAuth";

export default function ProjectDetailsView() {
  
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const params = useParams()
  const projectId = params.projectId!;
  const [searchParams] = useSearchParams()
  const taskId = searchParams.get('taskId');

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false
  })

  const {data: user, isLoading: loadingAuth} = useAuth()
  

   const {mutate} = useMutation({
    mutationFn: deleteTask, 
    onError: (error) => toast.error(error.message, {className: 'border border-red-500'}),
    onSuccess: (data)=> {
      toast.success(data, {className: 'border border-lime-400'})
      queryClient.invalidateQueries({queryKey: [`project`, projectId]})
    }
  }) 

  const handleDelete = () => {
    if (!taskId) return;
    const data= {projectId, taskId}
    mutate(data)
  }

  useEffect(() => {
    if (isError && error) {
      handleInternalError(error);
      navigate(`/`);
    }
  }, [isError, error, navigate]);

  const hasAuthorization = useMemo(() => data?.manager === user?._id , [data, user])

  if (isLoading || loadingAuth) return < Spinner />
  
  if (data && user) return (
    <>
    <div className="text-center sm:text-left">
      <h1 className="text-5xl font-black break-words">{data.projectName}</h1>
      <p className="text-2xl font-light text-gray-500 mt-5 break-words" >{data.description}</p>
  
    {
      isManager(data.manager, user._id) && 
        <nav className="my-5 flex flex-col gap-3 sm:flex-row">
          <Link 
            to={`${location.pathname}?newTask=true`}
            className="bg-purple-400 hover:bg-purple-500 text-white px-10 py-3 text-xl font-bold cursor-pointer transition-colors "
          >Add Task</Link>
          
          <Link 
            to={`${location.pathname}/team`}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-10 py-3 text-xl font-bold cursor-pointer transition-colors"
          >Collaborators</Link>
        </nav>
     }
    </div>
    
    <TaskList tasks={data.tasks} hasAuthorization={hasAuthorization}/>
    <AddTaskModal projectId={projectId}/>
    <EditTaskModal 
      projectId={projectId}  
    />
    <ConfirmDelete title="Delete task" handleDelete={handleDelete}/>
    <ModalViewTask projectId={projectId} />

  </>
  )
}
