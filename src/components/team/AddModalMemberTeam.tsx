import { Fragment } from "react";
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";
import AddMemberForm from "./AddMemberForm";

export default function AddModalMemberTeam() {
  const [searchParams, setSearchParams] = useSearchParams()
  const show = searchParams.get('addMember') === 'true'


  return (
    <>
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
                    Add member to team
                  </DialogTitle>
                  <p className="text-xl font-bold">
                    Find the new member by email {""}
                    <span className="text-fuchsia-600">
                      to add them to the project
                    </span>
                  </p>

                   <AddMemberForm />
                   
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
