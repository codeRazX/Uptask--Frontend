import { useNavigate } from "react-router-dom"
import {useForm} from 'react-hook-form'
import { useMutation } from "@tanstack/react-query"
import ProjectForm from "@/components/projects/ProjectForm"
import HeaderSection from "@/components/HeaderSection"
import { createProject } from "@/api/projectApi"
import { handleOnErrorMutation, handleOnSuccessMutation } from "@/lib/query/handlerQuerys"
import { type ProjectFormData, guardIsErrorBackend } from "@/types/index"


export default function CreateProjectView() {
  const navigate = useNavigate()
  const initialValues : ProjectFormData= {projectName: '', clientName: '', description: ''}
  const {register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})
  
  const mutation = useMutation({
    mutationFn: createProject,
    onError: handleOnErrorMutation,
    onSuccess: (data) => handleOnSuccessMutation(data, navigate)
  })

  const handleForm = (formData : ProjectFormData) => mutation.mutate(formData)

  return (
    <div className="max-w-3xl mx-auto">
      < HeaderSection 
        title="Create Project"
        subtitle="Fill out the following form to create a project"
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
          value='Create Project'
          className="bg-fuchsia-600 w-full p-3 text-white uppercase font-black hover:bg-fuchsia-700 cursor-pointer"
        />
      </form>
    </div>
  )
}
