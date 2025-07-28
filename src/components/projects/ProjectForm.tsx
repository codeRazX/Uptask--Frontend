import ErrorMessage from "../ErrorMessage"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { ProjectFormData, ProjectErrorsBackend } from "@/types/index";

type ProjectFormProps = {
  register:  UseFormRegister<ProjectFormData>,
  errors: FieldErrors<ProjectFormData>,
  backendErrors: ProjectErrorsBackend | null
}

export default function ProjectForm({register, errors, backendErrors} : ProjectFormProps) {

    return (
        <>
          <div className="mb-5 space-y-3">
            <label htmlFor="projectName" className="text-sm uppercase font-bold">Project name</label>
            <input
                id="projectName"
                className="w-full p-3  border border-gray-200 focus:outline-0 focus:border-purple-400"
                type="text"
                placeholder="Project name"
                {...register("projectName", {
                    required: "The project name is required",
                    maxLength: {value: 100, message: '100 characters maximum allowed'}
                })}
            />

            {errors.projectName && <ErrorMessage>{errors.projectName.message}</ErrorMessage>}
            {backendErrors && backendErrors.projectName && <ErrorMessage>{backendErrors.projectName}</ErrorMessage>}
          </div>

          <div className="mb-5 space-y-3">
            <label htmlFor="clientName" className="text-sm uppercase font-bold">Client name</label>
            <input
                id="clientName"
                className="w-full p-3 border border-gray-200 focus:outline-0 focus:border-purple-400"
                type="text"
                placeholder="Client name"
                {...register("clientName", {
                    required: "The client's name is required",
                    maxLength: {value: 100, message: '100 characters maximum allowed'}
                })}
            />

            {errors.clientName && <ErrorMessage>{errors.clientName.message}</ErrorMessage>}
            {backendErrors && backendErrors.clientName && <ErrorMessage>{backendErrors.clientName}</ErrorMessage>}
          </div>

          <div className="mb-5 space-y-3">
            <label htmlFor="description" className="text-sm uppercase font-bold">Description</label>
            <textarea
                id="description"
                className="w-full p-3  border border-gray-200 min-h-20 resize-y max-h-100 focus:outline-0 focus:border-purple-400"
                placeholder="Project description"
                {...register("description", {
                    required: "A project description is required"
                })}
            />
          
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            {backendErrors && backendErrors.description && <ErrorMessage>{backendErrors.description}</ErrorMessage>}
          </div>
        </>
    )
}