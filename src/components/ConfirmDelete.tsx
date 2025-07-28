import { Fragment } from "react"
import { Dialog, Transition, DialogPanel, DialogTitle, Description } from "@headlessui/react"
import { useSearchParams } from "react-router-dom"

type ConfirmDeleteProps = {
  title: string,
  handleDelete: () => void
}

export default function ConfirmDelete({title, handleDelete} : ConfirmDeleteProps) {

  const [searchParams, setSearchParams] = useSearchParams()
  const elementToDelete = searchParams.get('delete')
  const show = !!elementToDelete

  if (elementToDelete) return (
   <Transition show={show} as={Fragment}
       enter="transition ease-out duration-200"
       enterFrom="transform opacity-0 scale-50" enterTo="transform opacity-100 scale-100"
       leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
       leaveTo="transform opacity-0 scale-50"
     >
       <Dialog
         as="div"
         className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
         onClose={() => setSearchParams({}, {replace: true})}
       >
         <DialogPanel className="bg-white rounded shadow-md p-6 w-96 md:w-lg max-w-full border border-red-300">
           <DialogTitle className="text-lg md:text-2xl font-bold">{title}?</DialogTitle>
           <Description className="mt-2 text-sm md:text-lg text-gray-600">
             This action cannot be undone
           </Description>
   
           <div className="mt-4 flex justify-end gap-x-2">
             <button
               className="px-3 py-1 text-sm md:text-lg text-gray-700 hover:text-gray-800 hover:font-medium cursor-pointer"
               onClick={() => setSearchParams({}, {replace: true})}
             >
               Cancel
             </button>
             <button
               className="px-3 py-1 text-sm bg-red-500 md:text-lg text-white rounded hover:bg-red-600 cursor-pointer"
               onClick={() => {
                 handleDelete()
                 setSearchParams({}, {replace: true})
               }}
             >
               Confirm
             </button>
           </div>
         </DialogPanel>
       </Dialog>
     </Transition>
  )
}
