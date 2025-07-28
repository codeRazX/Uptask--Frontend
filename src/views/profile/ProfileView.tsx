import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import ErrorMessage from "@/components/ErrorMessage";
import HeaderSection from "@/components/HeaderSection";
import Spinner from "@/components/Spinner";
import useAuth from "@/hooks/useAuth";
import { updateProfile } from "@/api/profileApi";
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys";
import { guardIsErrorBackend, type FormDataProfileType } from "@/types/index";


export default function ProfileView() {

  const queryClient = useQueryClient()
  const {data, isLoading} = useAuth()
  const {register, handleSubmit, formState: { errors }} = useForm<FormDataProfileType>({ defaultValues: data });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onError: handleOnErrorMutation,
    onSuccess: (data) => {
      toast.success(data, {className: 'border border-lime-400', toastId: data})
      queryClient.invalidateQueries({queryKey: ['user']})
    }
  })
  const handleEditProfile = (formData: FormDataProfileType) =>{
    if (formData.name === data?.name && formData.email === data.email){
      return
    }
    mutation.mutate(formData)
  };

  if (isLoading) return <Spinner />

  if(data) return (
    <>
      <div className="mx-auto max-w-3xl g">
        <HeaderSection 
          title="My Profile" 
          subtitle="Here you can update your information" 
          linkValue="Back to Projects"
          linkPath="/"
        />

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="name-profile">
              Name
            </label>
            <input
              id="name-profile"
              type="text"
              placeholder="Type your name"
              className="w-full p-3 border border-gray-200 focus:outline-0 focus:border-purple-400"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            {guardIsErrorBackend(mutation.error) && mutation.error.details.name &&<ErrorMessage>{mutation.error.details.name}</ErrorMessage>}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="email-profile">
              Email
            </label>
            <input
              id="email-profile"
              type="email"
              placeholder="Type your email"
              className="w-full p-3 border border-gray-200 focus:outline-0 focus:border-purple-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            {guardIsErrorBackend(mutation.error) && mutation.error.details.email && <ErrorMessage>{mutation.error.details.email}</ErrorMessage>}
          </div>
          <input
            type="submit"
            value="Save Changes"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
