import { useParams, useSearchParams } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import ErrorMessage from '../ErrorMessage'
import { handleOnErrorMutation } from '@/lib/query/handlerQuerys'
import { toast } from 'react-toastify'
import { createNote } from '@/api/notesApi'
import { guardIsErrorBackend, type NotesFormData } from '@/types/index'

export default function NotesAddForm() {

  const queryClient = useQueryClient()
  const initialValues : NotesFormData = {content: ''}
  const params = useParams()
  const projectId = params.projectId!
  const [searchParams] = useSearchParams()
  const taskId = searchParams.get('viewTask')!

  const {register, handleSubmit, reset, formState:{errors}} = useForm({defaultValues: initialValues})

  const mutation = useMutation({
    mutationFn: createNote ,
    onError: handleOnErrorMutation,
    onSuccess: (data) => {
      toast.success(data, {className: 'border border-lime-400', toastId: data})
      reset()
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    }
  })
  
  
  const handleCreateNote = (formData : NotesFormData) => {
    const data = {projectId, taskId, formData}
    mutation.mutate(data)
  }

  return (
    <form 
      className="space-y-3"
      onSubmit={handleSubmit(handleCreateNote)}
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">Create Note</label>
        <input 
          id="content"
          type="text" 
          className="w-full border border-gray-300 p-3 focus:outline-0 focus:border-purple-400 bg-white"
          placeholder="Note content"
          {...register('content', {
            required: 'Content is required',
            maxLength: {value: 250, message: 'Maximum characters allowed: 250'}
          })}
        />
        {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
        {guardIsErrorBackend(mutation.error) && <ErrorMessage>{mutation.error.details.content}</ErrorMessage>}
      </div>

      <input 
        type="submit" 
        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-black hover:bg-fuchsia-700 cursor-pointer"
        value={'Create note'}
        />
    </form>
  )
}
