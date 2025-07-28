import type{ FieldErrors, UseFormRegister } from "react-hook-form"
import type { TaskFormData, TaskErrorsBackend } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
  errors: FieldErrors<TaskFormData>
  register: UseFormRegister<TaskFormData>,
  backendErrors: TaskErrorsBackend | null
}

export default function TaskForm({errors, register, backendErrors} : TaskFormProps) {

  return (
  <>
    <div className="flex flex-col gap-5">
      <label
        className="font-normal text-2xl"
        htmlFor="name"
      >Task name</label>
      <input
        id="name"
        type="text"
        placeholder="Task name"
        className="w-full p-3  border-gray-300 border focus:outline-0 focus:border-purple-400"
        {...register("name", {
          required: "The task name is required",
        })}
      />
      {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      {backendErrors && backendErrors.name && <ErrorMessage>{backendErrors.name}</ErrorMessage>}
    </div>

    <div className="flex flex-col gap-5">
      <label
        className="font-normal text-2xl"
        htmlFor="description"
      >Task description</label>
      <textarea
        id="description"
        placeholder="Task description"
        className="w-full p-3  border-gray-300 border min-h-20 resize-y max-h-100 focus:outline-0 focus:border-purple-400"
        {...register("description", {
          required: "The task description is required"
        })}
      />
      {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      {backendErrors && backendErrors.description && <ErrorMessage>{backendErrors.description}</ErrorMessage>}
    </div>
  </>
    )
}