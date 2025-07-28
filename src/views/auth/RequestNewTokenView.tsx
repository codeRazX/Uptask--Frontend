import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys";
import ErrorMessage from "@/components/ErrorMessage";
import { requestNewTokenAuth } from "@/api/authApi";
import { guardIsErrorBackend, type RequestConfirmationTokenForm } from "../../types";

export default function RequestNewTokenView() {
  const initialValues: RequestConfirmationTokenForm = { email: "" };

  const {register,handleSubmit, reset, formState: { errors }} = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: requestNewTokenAuth,
    onError: handleOnErrorMutation,
    onSuccess: (data) => {
      toast.success(data, {className: 'border border-lime-400', toastId: data})
      reset()
    }
  })

  const handleRequestCode = (formData: RequestConfirmationTokenForm) => mutation.mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white">
        Request confirmation email
      </h1>
      <p className="text-2xl font-light text-white mt-5">
        Enter your email to receive {""}
        <span className=" text-fuchsia-500 font-bold"> a new confirmation link</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-8 p-10 rounded-lg bg-white mt-10"
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
            className="w-full p-3 rounded-lg border-gray-300 border focus:outline-0 focus:border-purple-400"
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
          value="Send email"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-gray-300 font-normal"
        >
          Already have an account? <span className="text-fuchsia-500 font-bold">Sign in</span>
        </Link>
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
