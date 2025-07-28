import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import {NavMenu} from "@/components/NavMenu";
import {ToastContainer} from 'react-toastify'
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export default function AppLayout() {

  const {data, isLoading} = useAuth()
 
  if (isLoading) return <p className="p-2 text-xl animate-pulse">Loading...</p>

  
  if (data) return (
    <>
    <header className="bg-gray-800 py-5">
      <div className="max-w-screen-2xl w-11/12 mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="w-64 max-w-64">
          <Link to={'/'}>
            <Logo />
          </Link>
        </div>

        <NavMenu name={data.name}/>
      </div>
    </header>

    <section className="max-w-screen-2xl w-11/12 mx-auto mt-10 py-5">
      <Outlet/>
    </section>

    <footer className="py-10">
      <p className="text-center font-light text-gray-500">All rights reserved&copy;, {new Date().getFullYear()}</p>
    </footer>

    < ToastContainer 
        pauseOnFocusLoss={false}
        pauseOnHover={false}
    />
    </>
    
  )
}
