import {Popover, PopoverButton, PopoverPanel, Transition} from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '@/api/authApi'
import { handleOnErrorMutation } from '@/lib/query/handlerQuerys'
import type { UserType } from '../types'

type NavMenuProps = {
  name: UserType['name']
}
export const NavMenu = ({name} : NavMenuProps) => {
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: logout,
    onError: handleOnErrorMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']})
    }
  })
 
  return (
    <Popover className='relative'>
      <PopoverButton className='inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-purple-400 cursor-pointer hover:bg-purple-500'>
        <Bars3Icon className='w-8 h-8 text-white ' />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <PopoverPanel className='absolute left-1/2 z-10 mt-5 flex w-[95vw] -translate-x-1/2 md:-translate-x-48'>
          <div className='w-full md:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
            <p className='text-center'>Hello: {name}</p>
            <Link
              to='/profile'
              className='block p-2 hover:text-purple-950 hover:font-bold'
            >
              Profile
            </Link>
            <Link
              to='/'
              className='block p-2 hover:text-purple-950 hover:font-bold'
            >
              My projects
            </Link>
            <button
              className='block p-2 hover:text-purple-950 cursor-pointer hover:font-bold'
              type='button'
              onClick={()=> mutate()}
            >
              Log out
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}