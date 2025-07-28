import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import HeaderSection from "@/components/HeaderSection";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/api/profileApi";
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys";
import { toast } from "react-toastify";
import { guardIsErrorBackend, type FormDataProfilePassword } from "@/types/index";

export default function PasswordProfileView() {

  const initialValues : FormDataProfilePassword = {
    current_password: '',
    password: '',
    confirm_password: ''
  }

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const mutation = useMutation({
    mutationFn: updatePassword,
    onError: handleOnErrorMutation,
    onSuccess: (data) => {
      toast.success(data, {className: 'border border-lime-400', toastId: data})
      reset()
    }
  })
  const password = watch('password');

  const handleChangePassword = (formData : FormDataProfilePassword) => mutation.mutate(formData)

 
  return (
    <>
    <div className="mx-auto max-w-3xl">
      <HeaderSection 
        title="Change Password" 
        subtitle="Use this form to change your password" 
        linkValue="Back to Projects"
        linkPath="/"
      />
    
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
        noValidate
      >
        <div className="mb-5 space-y-3">
          <label
            className="text-sm uppercase font-bold"
            htmlFor="current-password-profile"
          >Current Password</label>
          <input
            id="current-password-profile"
            type="password"
            placeholder="Current password"
            className="w-full p-3 border border-gray-200 focus:outline-0 focus:border-purple-400"
            {...register("current_password", {
              required: "Current password is required",
            })}
          />
          {errors.current_password && (
            <ErrorMessage>{errors.current_password.message}</ErrorMessage>
          )}
          {guardIsErrorBackend(mutation.error) && mutation.error.details.current_password && <ErrorMessage>{mutation.error.details.current_password}</ErrorMessage>}
        </div>

        <div className="mb-5 space-y-3">
          <label
            className="text-sm uppercase font-bold"
            htmlFor="new-password-profile"
          >New Password</label>
          <input
            id="new-password-profile"
            type="password"
            placeholder="New password"
            className="w-full p-3  border border-gray-200 focus:outline-0 focus:border-purple-400"
            {...register("password", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /[A-Z]/,
                message: "Password must contain at least one capital letter"
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
          {guardIsErrorBackend(mutation.error) && mutation.error.details.password && <ErrorMessage>{mutation.error.details.password}</ErrorMessage>}
        </div>
        <div className="mb-5 space-y-3">
          <label
            htmlFor="password-confirmation-profile"
            className="text-sm uppercase font-bold"
          >Confirm Password</label>

          <input
            id="password-confirmation-profile"
            type="password"
            placeholder="Confirm password"
            className="w-full p-3  border border-gray-200 focus:outline-0 focus:border-purple-400"
            {...register("confirm_password", {
              required: "Confirm password is required",
              validate: value => value === password || 'The passwords do not match'
            })}
          />
          {errors.confirm_password && (
            <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
          )}
          {guardIsErrorBackend(mutation.error) && mutation.error.details.confirm_password && <ErrorMessage>{mutation.error.details.confirm_password}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value='Change Password'
          className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
        />
      </form>
    </div>
    </>
  )

}
