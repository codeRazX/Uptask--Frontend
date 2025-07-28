import { Fragment } from "react"
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { getTaskById, updateTask } from "@/api/taskApi"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys"
import { toast } from "react-toastify"
import { useEffect } from "react"
import TaskForm from "./TaskForm"
import { handleInternalError } from "@/utils/index"
import { type Project, type TaskFormData, guardIsErrorBackend } from "@/types/index"


type EditTaskModalProps= {
  projectId: Project['_id']
}

export default function EditTaskModal({projectId} : EditTaskModalProps) {

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const taskId = searchParams.get('editTask')!;
  const show = taskId? true: false

  const {register, handleSubmit, formState:{errors}, reset } = useForm<TaskFormData>({defaultValues: {
    name: '',
    description: ''
  }})

  const {data, isError, error} = useQuery({
    queryKey: ['task', taskId],
    queryFn: ()=> getTaskById({projectId, taskId}),
    enabled: !!taskId,
    retry: false
  })

  const mutation = useMutation({
    mutationFn: updateTask,
    onError: handleOnErrorMutation,
    onSuccess: (data) => {
      setSearchParams({}, {replace: true})
      toast.success(data, {className: 'border border-lime-400'})
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
    }
  })

  useEffect(() => {
    if (!show){
      reset()
    }
    else{
      if(data){
        reset({
          name: data.name,
          description: data.description
      })
      }
    }
  }, [show, reset, data])

  const handleForm = (formData: TaskFormData) => {
    const data = {formData, projectId, taskId}
    mutation.mutate(data)
  }

  useEffect(() => {
    if (isError && error) {
      handleInternalError(error);
      navigate(`/`);
    }
  }, [isError, error, navigate]);

 if (data) return (

   <Transition appear show={show} as={Fragment}>
     <Dialog as="div" className="relative z-10" onClose={() => setSearchParams({}, { replace: true })}>
       <TransitionChild
         as={Fragment}
         enter="ease-out duration-300"
         enterFrom="opacity-0"
         enterTo="opacity-100"
         leave="ease-in duration-200"
         leaveFrom="opacity-100"
         leaveTo="opacity-0"
       >
         <div className="fixed inset-0 bg-black/60" />
       </TransitionChild>

       <div className="fixed inset-0 overflow-y-auto">
         <div className="flex min-h-full items-center justify-center p-4 text-center">
           <TransitionChild
             as={Fragment}
             enter="ease-out duration-300"
             enterFrom="opacity-0 scale-95"
             enterTo="opacity-100 scale-100"
             leave="ease-in duration-200"
             leaveFrom="opacity-100 scale-100"
             leaveTo="opacity-0 scale-95"
           >
             <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
               <DialogTitle as="h3" className="font-black text-4xl  my-5">
                 Edit Task
               </DialogTitle>

               <p className="text-xl font-bold">
                 Make changes to a task {""}
                 <span className="text-fuchsia-600">this form</span>
               </p>

               <form className="mt-10 space-y-3" noValidate onSubmit={handleSubmit(handleForm)}>

                <TaskForm 
                  register={register} 
                  errors={errors}
                  backendErrors={guardIsErrorBackend(mutation.error) ? mutation.error.details : null}
                />

                <input
                  type="submit"
                  className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 uppercase  text-white font-black cursor-pointer"
                  value="Save Task"
                />
              </form>
             </DialogPanel>
           </TransitionChild>
         </div>
       </div>
     </Dialog>
   </Transition>
 );
}


