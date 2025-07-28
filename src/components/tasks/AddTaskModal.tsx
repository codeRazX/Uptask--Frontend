import { Fragment } from 'react';
import { Dialog, Transition, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import {useForm} from 'react-hook-form'
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TaskForm from './TaskForm';
import { createTask } from '@/api/taskApi';
import { handleOnErrorMutation } from '@/lib/query/handlerQuerys';
import { type TaskFormData, type Project, guardIsErrorBackend } from '@/types/index';


type AddTastkModalProps = {
  projectId: Project['_id']
}


export default function AddTaskModal({projectId} : AddTastkModalProps) {

  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const show = searchParams.get('newTask') === 'true' ? true : false
  
  const initialValues : TaskFormData = {name: '', description: ''}
  const {register, handleSubmit,  formState: {errors}, reset } = useForm({defaultValues: initialValues})

  useEffect(() => {
    if (!show){
      reset()
    }
  }, [show, reset])

  const mutation = useMutation({
    mutationFn: createTask,
    onError: handleOnErrorMutation,
    onSuccess: (data) => {
      setSearchParams({}, { replace: true })
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
      toast.success(data, {className: 'border border-lime-400'})
    } 
  })
  
  const handleForm = (formData: TaskFormData) => {
    const data = {projectId, formData}
    mutation.mutate(data)
  }

  return (
  <>
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
          <div className="fixed inset-0 bg-black/40" />
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
                <DialogTitle as="h3" className="font-black text-4xl my-5">New Task</DialogTitle>

                <p className="text-xl font-bold">Fill out the form and create  {''}
                  <span className="text-fuchsia-600">a task</span>
                </p>

              <form 
                className="mt-10 space-y-4" 
                onSubmit={handleSubmit(handleForm)}
                noValidate
                >
                
                <TaskForm 
                  register={register}
                  errors={errors}
                  backendErrors={guardIsErrorBackend(mutation.error) ? mutation.error.details  : null}
                />

                <input 
                  type="submit" 
                  value='Create Task'
                  className="bg-fuchsia-600 w-full p-3 text-white uppercase font-black hover:bg-fuchsia-700 cursor-pointer "
                />
                </form>       
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  </>
  )
}