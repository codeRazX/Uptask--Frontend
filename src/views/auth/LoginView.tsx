import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/api/authApi";
import ErrorMessage from "@/components/ErrorMessage";
import { guardIsErrorBackend, type UserLoginForm } from "@/types/index";
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys";


export default function LoginView() {
  
  const initialValues: UserLoginForm = {email: "",password: ""};
  const {register, handleSubmit, formState: { errors }} = useForm({ defaultValues: initialValues });
  const navigate = useNavigate()
 
  const mutation = useMutation({
    mutationFn: postLogin,
    onError: handleOnErrorMutation,
    onSuccess: () => {
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutation.mutate(formData)

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="email" className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Login Email"
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
          {guardIsErrorBackend(mutation.error) && mutation.error.details.email && <ErrorMessage>{mutation.error.details.email}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label htmlFor="password" className="font-normal text-2xl">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Login Password"
            className="w-full p-3 border-gray-300 border focus:outline-0 focus:border-purple-400"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
          {guardIsErrorBackend(mutation.error) && mutation.error.details.password && <ErrorMessage>{mutation.error.details.password}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Login"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black  text-xl cursor-pointer"
        />
      </form>

       <nav className="mt-10 flex flex-col space-y-4">
          <Link to={'/auth/register'} className="text-center text-gray-300 font-normal">You don't have an account? <span className="text-fuchsia-500 font-bold">Create account</span></Link>
          <Link
            to="/auth/forgot-password"
            className="text-center text-gray-300 font-normal"
          >
          Forgot your password? <span className="text-fuchsia-500 font-bold">Restore</span>
        </Link>
      </nav>
    </>
  );
}
