import { useNavigate, useParams } from "react-router-dom"
import { useForm} from 'react-hook-form'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getProjectById, updateProject } from '@/api/projectApi'
import Spinner from '@/components/Spinner'
import HeaderSection from "@/components/HeaderSection"
import ProjectForm from "@/components/projects/ProjectForm"
import { handleOnErrorMutation, handleOnSuccessMutation } from "@/lib/query/handlerQuerys"
import { useEffect } from "react"
import { handleInternalError } from "@/utils/index"
import { type ProjectFormData, guardIsErrorBackend } from "@/types/index"


export default function EditProjectView() {
  
  const params = useParams()
  const projectId = params.projectId!;
  const navigate = useNavigate()

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false
  })

  
  const {register, handleSubmit, formState: {errors}, reset } = useForm({defaultValues: {
    projectName: '', 
    clientName: '',
    description: ''
  }})
  
  const mutation = useMutation({
    mutationFn: updateProject,
    onError: handleOnErrorMutation,
    onSuccess: (data) => handleOnSuccessMutation(data, navigate)
  })

  useEffect(() => {
  if (data) {
    reset({
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    });
  }
  }, [data, reset]);

 useEffect(() => {
  if (isError && error) {
    handleInternalError(error);
    navigate('/');
  }
  }, [isError, error, navigate]);

  const handleForm = (formData : ProjectFormData) => {
    const data = {formData, projectId}
    mutation.mutate(data)
  }

  
  if (isLoading) return < Spinner />
  
  
  if (data) return (
    <div className="max-w-3xl mx-auto">
      < HeaderSection 
        title="Edit Project"
        subtitle="Fill out the following form to edit a project"
        linkValue="Back to Projects"
        linkPath="/"
      />
    
    <form 
      className="mt-10 bg-white shadow-lg p-10 rounded-lg" 
      onSubmit={handleSubmit(handleForm)}
      noValidate
      >
        
      <ProjectForm 
        register={register} 
        errors={errors}
        backendErrors={guardIsErrorBackend(mutation.error) ? mutation.error.details : null}
      />

      <input 
        type="submit" 
        value='Save Project'
        className="bg-fuchsia-600 w-full p-3 text-white uppercase font-black hover:bg-fuchsia-700 cursor-pointer"
      />
    </form>       
    </div>
  )
}
