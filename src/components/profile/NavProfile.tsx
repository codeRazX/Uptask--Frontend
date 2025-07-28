import { FingerPrintIcon, UserIcon } from '@heroicons/react/20/solid'
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom'



export default function NavProfile() {
  const location = useLocation()
  const isProfileActive = useMemo(()=>location.pathname === '/profile', [location]);
  const isPasswordActive = useMemo(()=>location.pathname === '/profile/password', [location]);

  return (
    <div className="md:border-b md:border-gray-200">
      <nav className="-mb-px flex flex-col items-center gap-8 md:flex-row" aria-label="Tabs">
        <Link
          to={'/profile'}
          className={`${isProfileActive ? 'border-purple-800 text-purple-800' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium`}
        >
          <UserIcon
            className={`${isProfileActive? 'text-purple-800' : 'text-gray-400 group-hover:text-gray-500'} -ml-0.5 mr-2 h-5 w-5`}
            aria-hidden="true"
          />
            My Profile
        </Link>

        <Link
          to={'/profile/password'}
          className={`${isPasswordActive ? 'border-purple-800 text-purple-800' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium`}
        >
          <FingerPrintIcon
            className={`${isPasswordActive ? 'text-purple-800' : 'text-gray-400 group-hover:text-gray-500'} -ml-0.5 mr-2 h-5 w-5`}
            aria-hidden="true"
          />
            Change Password
        </Link>
        
      </nav>
    </div>
  )
}
