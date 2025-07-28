import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { guardIsErrorBackend, type TeamMemberForm } from "@/types/index";
import { findMemberById } from "@/api/TeamApi";
import Spinner from "../Spinner";
import SearchMemberTeam from "./SearchMemberTeam";

export default function AddMemberForm() {
  const initialValues: TeamMemberForm = {
    email: "",
  };
  const params = useParams();
  const projectId = params.projectId!;

  const {register, handleSubmit, reset, formState: { errors }} = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: findMemberById
  });

  const handleSearchUser = async (formData : TeamMemberForm) => {
    const data = {formData, projectId}
    mutation.mutate(data)
  };

  const handleResetFormMember = () => {
    mutation.reset()
    reset()
  }

  return (
    <>
      <form
        className="mt-10 space-y-5"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label className="font-normal text-2xl" htmlFor="name">
            User email
          </label>
          <input
            id="name"
            type="text"
            placeholder="User email to add"
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
          {guardIsErrorBackend(mutation.error) &&  <ErrorMessage>{mutation.error.details.email}</ErrorMessage>}
        </div>

        <input
          type="submit"
          className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black  text-xl cursor-pointer"
          value="Find User"
        />
      </form>
      {mutation.isPending && <Spinner />}
      <div className="my-10">
        {mutation.isError && <p className="text-center text-red-500 font-medium">{mutation.error.message}</p>}
        {mutation.data &&  
          ( 
            <SearchMemberTeam 
                member={mutation.data} 
                projectId={projectId}
                handleReset={handleResetFormMember}
            />
          )
        }
      </div>
    </>
  );
}
