import { Fragment, useState } from "react";
import { Dialog, Transition, TransitionChild, DialogTitle, DialogPanel } from "@headlessui/react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import { getTaskById, updateStatus } from "@/api/taskApi";
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys";
import { handleInternalError, formatDate, STATUS_TASK, STATUS_TEXT_COLOR } from "@/utils/index";
import NotesPanel from "../notes/NotesPanel";
import type { Project, TaskStatusType } from "@/types/index";


export default function TaskModalDetails({projectId} : {projectId: Project['_id']}) {

  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const taskId = searchParams.get('viewTask')!
  const show = !!taskId
  const [showHistory, setShowHistory] = useState(false)

  const {data, isError, error} = useQuery({
    queryKey: ['task', taskId],
    queryFn: ()=> getTaskById({projectId, taskId}),
    enabled: !!taskId,
    retry: false
  })

  const {mutate} = useMutation({
    mutationFn: updateStatus,
    onError: handleOnErrorMutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
      toast.success(data, {className: 'border border-lime-400', toastId: data})
    }
  })

  const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatusType
    const data = {projectId, taskId, status}
    mutate(data)
  }

  useEffect(() => {
    if (isError && error) {
      handleInternalError(error);
      navigate(`/`);
    }
  }, [isError, error, navigate]);

    
  
  if (data) return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setSearchParams({}, {replace: true})}>
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
                  <p className="text-sm text-slate-400">Created at: {formatDate(data.createdAt)} </p>
                  <p className="text-sm text-slate-400">
                    Last update: {formatDate(data.updatedAt)}
                  </p>
                  <DialogTitle
                    as="h3"
                    className="font-black text-4xl text-slate-600 my-5 break-words"
                  >
                    {data.name}
                  </DialogTitle>
                  <p className="text-lg text-slate-500 mb-2 break-words">Description: {data.description}</p>

                  <p className="text-2xl font-bold text-slate-600 mb-2">Change History</p>
                  {
                    data.whoWorking.length ? (
                     <button 
                      className="font-medium text-purple-600 hover:font-bold cursor-pointer mb-2"
                      onClick={()=> setShowHistory((prev) => !prev)}
                     >
                      {showHistory ? 'Hide History': 'Show History'}
                    </button>

                    ) : (<p className="text-slate-600 font-bold">No status updates yet</p>)
                  }

                  {
                    showHistory && (
                      <ul className="list-decimal">
                        {data.whoWorking.map((log) => (
                          <li key={log._id}>
                            <p className=" text-slate-600 font-bold">Changed to <span className={`${STATUS_TEXT_COLOR[log.status]}`}>"{STATUS_TASK[log.status]}"</span>{''} by: {''}<span className=" text-slate-800">{log.user?.name}</span></p>
                          </li>
                        ))}
                      </ul>
                    )
                  }

                  <div className="my-5 space-y-3">
                    <div className="flex flex-col gap-2">
                      <label className="font-bold">Current Status:</label>
                      <select 
                        className="w-full border border-gray-300 p-3 focus:outline-0 focus:border-purple-400 bg-white" value={data.status}
                        onChange={handleChange}
                      >
                        {Object.entries(STATUS_TASK).map(([value, name]) => (
                          <option className="capitalize" key={value} value={value}>{name}</option>
                        ))}
            
                      </select>
                    </div>

                  </div>

                  <NotesPanel notes={data.notes}/>

                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
