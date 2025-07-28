import { Fragment } from "react";
import {Dialog, Transition, TransitionChild, DialogPanel, DialogTitle} from "@headlessui/react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { checkPassword } from "@/api/authApi";
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys";
import { guardIsErrorBackend, type checkPasswordType } from "@/types/index";

type ConfirmDeleteProjectProps = {
  handleDeleteProject: () => void
}

export default function ConfirmDeleteProject({handleDeleteProject}: ConfirmDeleteProjectProps) {

  const initialValues : checkPasswordType = {password: ""}
  const [searchParams, setSearchParams] = useSearchParams()
  const elementToDelete = searchParams.get('delete')
  const show = !!elementToDelete

  const { register, handleSubmit, formState: { errors }} = useForm({ defaultValues: initialValues });

  const checkPasswordMutation = useMutation({
    mutationFn: checkPassword,
    onError: handleOnErrorMutation
  })

  const handleForm = async (formData: checkPasswordType) =>{
    await checkPasswordMutation.mutateAsync(formData)
    handleDeleteProject()
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setSearchParams({}, {replace: true})}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                <DialogTitle as="h3" className="font-black text-4xl  my-5">
                  Delete Project{" "}
                </DialogTitle>

                <p className="text-xl font-bold">
                  Enter your password to confirm {""}
                  <span className="text-fuchsia-600">
                    project deletion
                  </span>
                </p>

                <form
                  className="mt-10 space-y-5"
                  onSubmit={handleSubmit(handleForm)}
                  noValidate
                >
                  <div className="flex flex-col gap-3">
                    <label className="font-normal text-2xl" htmlFor="check-password">
                      Password
                    </label>
                    <input
                      id="check-password"
                      type="password"
                      placeholder="Login password"
                      className="w-full p-3  border-gray-300 border focus:outline-0 focus:border-purple-400"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                    {guardIsErrorBackend(checkPasswordMutation.error) && checkPasswordMutation.error.details.password && <ErrorMessage>{checkPasswordMutation.error.details.password}</ErrorMessage>}
                  </div>

                  <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black  text-xl cursor-pointer"
                    value="Delete Project"
                  />
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
