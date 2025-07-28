import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMessage from "@/components/ErrorMessage";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/authApi";
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys";
import { guardIsErrorBackend, type UserRegistrationForm } from "@/types/index";

export default function RegisterView() {
  
  const initialValues: UserRegistrationForm = {name: "", email: "",  password: "", confirm_password: ""};

  const {register, handleSubmit, watch, reset, formState: { errors }} = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const password = watch("password");

  const mutation = useMutation({
    mutationFn: createAccount,
    onError: handleOnErrorMutation,
    onSuccess: (data) => {
      toast.success(data, {
        className: 'border border-lime-400', 
        toastId: data,
        autoClose: 10000,
        pauseOnHover: true,
        pauseOnFocusLoss: true
      })
      reset()
    }
  })

  const handleRegister = (formData: UserRegistrationForm) => mutation.mutate(formData)


  return (
    <>
      <h1 className="text-5xl font-black text-white">Create account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Fill out the form to  {""}
        <span className=" text-fuchsia-500 font-bold"> create your account</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Registration Email"
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
          <label htmlFor="name" className="font-normal text-2xl">Name</label>
          <input
            id="name"
            type="name"
            placeholder="Registration Name"
            className="w-full p-3 border-gray-300 border focus:outline-0 focus:border-purple-400"
            {...register("name", {
              required: "Username is required",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          {guardIsErrorBackend(mutation.error) && mutation.error.details.name && <ErrorMessage>{mutation.error.details.name}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label htmlFor="password" className="font-normal text-2xl">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Registration Password"
            className="w-full p-3 border-gray-300 border focus:outline-0 focus:border-purple-400"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "The password must be at least 8 characters long",
              },
              pattern: {
                value: /[A-Z]/,
                message: 'Password must contain at least one capital letter'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
          {guardIsErrorBackend(mutation.error) && mutation.error.details.password && <ErrorMessage>{mutation.error.details.password}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label htmlFor="password_confirmation" className="font-normal text-2xl">Confirm Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Confirm the password"
            className="w-full p-3 border-gray-300 border focus:outline-0 focus:border-purple-400"
            {...register("confirm_password", {
              required: "You must confirm the password",
              validate: (value) =>
                value === password || "The passwords are not the same",
            })}
          />

          {errors.confirm_password && (
            <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
          )}
          {guardIsErrorBackend(mutation.error) && mutation.error.details.confirm_password && <ErrorMessage>{mutation.error.details.confirm_password}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Register"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
          <Link to={'/auth/login'} className="text-center text-gray-300 font-normal">Already have an account? <span className="text-fuchsia-500 font-bold">Sign in</span></Link>
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
