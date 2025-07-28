import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys";
import { requestResetPassword } from "@/api/authApi";
import { guardIsErrorBackend, type ForgotPasswordForm } from "@/types/index";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {email: ''}
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: requestResetPassword,
    onError: handleOnErrorMutation,
    onSuccess: (data) => {
      toast.success(data, {className: 'border border-lime-400', toastId: data})
      reset()
    }
  })
  
  const handleForgotPassword = (formData: ForgotPasswordForm) => mutation.mutate(formData)
  

  return (
    <>
      <h1 className="text-5xl font-black text-white">Reset password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Fill out the form to  {""}
        <span className=" text-fuchsia-500 font-bold"> reset your password</span>
      </p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10 bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Registration email"
            className="w-full p-3 border-gray-300 border focus:outline-0 focus:border-purple-400"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          {guardIsErrorBackend(mutation.error) && <ErrorMessage>{mutation.error.details.email}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value='Send Instructions'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/login'
          className="text-center text-gray-300 font-normal"
        >
          Already have an account? <span className="text-fuchsia-500 font-bold">Sign in</span>
        </Link>

        <Link
          to='/auth/register'
          className="text-center text-gray-300 font-normal"
        >
          You don't have an account?  <span className="text-fuchsia-500 font-bold">Create account</span>
        </Link>
      </nav>
    </>
  )
}