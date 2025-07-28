import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { requestNewPassword } from "@/api/authApi";
import ErrorMessage from "@/components/ErrorMessage";
import {guardIsErrorBackend, type NewPasswordForm } from "../../types";
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys";

export default function NewPasswordView() {
  const params = useParams();
  const token = params.tokenPassword!;
  const navigate = useNavigate();
  const initialValues: NewPasswordForm = { password: "", confirm_password: "" };
  const {register, handleSubmit, watch, formState: { errors }} = useForm({ defaultValues: initialValues });


  const mutation = useMutation({
    mutationFn: requestNewPassword,
    onError: handleOnErrorMutation,
    onSuccess: (data) => {
      toast.success(data, {className: 'border border-lime-400', toastId: data})
      navigate('/auth/login')
    }
  })


  const handleNewPassword = (formData: NewPasswordForm) =>{
    const data = {...formData, token}
    mutation.mutate(data)
  };

  const password = watch("password");

  return (
    <>
      <h1 className="text-5xl font-black text-white">New Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Fill out the form to {""}
        <span className=" text-fuchsia-500 font-bold">
          {" "}
          reset a new password
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10 bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="password" className="font-normal text-2xl">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Registration Password"
            className="w-full p-3  border-gray-300 border focus:outline-0 focus:border-purple-400"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "The password must be at least 8 characters long",
              },
              pattern: {
                value: /[A-Z]/,
                message: "Password must contain at least one capital letter",
              },
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          {guardIsErrorBackend(mutation.error) && mutation.error.details.password && <ErrorMessage>{mutation.error.details.password}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label htmlFor="confirm_password" className="font-normal text-2xl">
            Confirm Password
          </label>

          <input
            id="confirm_password"
            type="password"
            placeholder="Repeat registration password"
            className="w-full p-3  border-gray-300 border focus:outline-0 focus:border-purple-400"
            {...register("confirm_password", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "The passwords are not the same",
            })}
          />

          {errors.confirm_password && <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>}
          {guardIsErrorBackend(mutation.error) && mutation.error.details.confirm_password && <ErrorMessage>{mutation.error.details.confirm_password}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Set password"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-gray-300 font-normal"
        >
          Already have an account?{" "}
          <span className="text-fuchsia-500 font-bold">Sign in</span>
        </Link>

        <Link
          to="/auth/register"
          className="text-center text-gray-300 font-normal"
        >
          You don't have an account?{" "}
          <span className="text-fuchsia-500 font-bold">Create account</span>
        </Link>
      </nav>
    </>
  );
}
