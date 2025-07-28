import { Fragment } from "react"
import { Menu, MenuButton, Transition, MenuItems, MenuItem } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useNavigate, useLocation } from "react-router-dom"
import {useDraggable} from '@dnd-kit/core'
import type { TaskDashboard } from "@/types/index"


type TaskCardProps = {
  task: TaskDashboard,
  hasAuthorization: boolean
}

export default function TaskCard({task, hasAuthorization} : TaskCardProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task._id
  })
  const navigate = useNavigate()
  const location = useLocation()

  const style = transform ?
  {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : undefined

  return (
    <li 
    {...attributes}
    ref={setNodeRef}
    style={style}
    className="p-5 bg-white border border-slate-300 flex justify-between gap-3">
      <div 
      {...listeners}
      className="min-w-0 flex flex-col gap-y-4"> 
        <p className="text-xl font-bold text-slate-600 text-left cursor-grab break-words">{task.name}</p>
        <p className="text-slate-500 break-words cursor-grab">{task.description}</p>
      </div>

      <div className="flex shrink-0  gap-x-6">
        <Menu as="div" className="relative flex-none">
          <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
              <span className="sr-only">options</span>
              <EllipsisVerticalIcon className="h-9 w-9 cursor-pointer" aria-hidden="true" />
          </MenuButton>

          <Transition as={Fragment} 
          enter="transition ease-out duration-100"      
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
            <MenuItems
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <MenuItem>
                <button
                 onClick={()=> navigate(location.pathname + `?viewTask=${task._id}`)} 
                 className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-purple-950 hover:font-bold cursor-pointer'>
                  View task
                </button>
              </MenuItem>
              {
                hasAuthorization &&
                <>
                  <MenuItem>
                    <button 
                      onClick={()=> navigate(location.pathname + `?editTask=${task._id}`)}
                      className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-purple-950 hover:font-bold cursor-pointer'>
                      Edit task </button>
                  </MenuItem>

                  <MenuItem>
                    <button 
                      onClick={()=> navigate(location.pathname + `?delete=task&taskId=${task._id}`)}
                      className='block px-3 py-1 text-sm leading-6 text-red-500 hover:text-red-600 hover:font-bold cursor-pointer'>
                      Delete Task
                    </button>
                  </MenuItem>
                </>
              }

            </MenuItems>
          </Transition>
        </Menu>
    </div>
  </li>
  )
}
