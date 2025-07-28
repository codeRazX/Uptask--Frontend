import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Menu, MenuButton, MenuItems, MenuItem, Transition} from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { isManager } from '@/utils/index'
import type { DashboardProject, UserType } from '@/types/index'

type ProjectDashboardProps = {
  project: DashboardProject,
  user: UserType['_id']
}

export default function ProjectListItem({project, user} : ProjectDashboardProps) {
  
  return (
  <>
  <li className="flex justify-between gap-x-6 px-5 py-10">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto space-y-2">
          <div className='mb-2'>
            {isManager(user, project.manager) ? 
              <p className='font-extrabold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-md inline-block py-1 px-5'>Manager</p> :
              <p className='font-extrabold text-xs uppercase bg-lime-50 text-lime-500 border-2 border-lime-500 rounded-md inline-block py-1 px-5'>Collaborator</p>
            }
          </div>

          <Link to={`/projects/${project._id}`} className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold break-words">{project.projectName}</Link>
          <p className="text-sm text-gray-400 break-words">Client: {project.clientName}</p>
          <p className="text-sm text-gray-400 break-words">{project.description}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-x-6">
        <Menu as="div" className="relative flex-none">

          <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 cursor-pointer">
            <span className="sr-only">options</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </MenuButton>

          <Transition as={Fragment} 
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">

              <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                
                <MenuItem>
                  <Link to={`/projects/${project._id}`} className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-purple-950 hover:font-bold'> View project </Link>
                </MenuItem>

                {
                isManager(user, project.manager) && 
                  <>
                    <MenuItem>
                      <Link to={`/projects/${project._id}/edit`}className='block px-3 py-1 text-sm leading-6 text-gray-900 hover:text-purple-950 hover:font-bold'>Edit Project</Link>
                    </MenuItem>

                    <MenuItem>
                      <Link 
                        type='button' 
                        className='block px-3 py-1 text-sm leading-6 text-red-500 cursor-pointer hover:text-red-600 hover:font-bold'
                        to={`${location.pathname}?delete=project&projectId=${project._id}`}
                      >
                          Delete Project
                      </Link>
                    </MenuItem>
                  </>
                }
              </MenuItems>
        </Transition>
      </Menu>
    </div>
  </li>

  </>
  )
}
