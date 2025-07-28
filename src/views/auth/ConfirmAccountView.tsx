import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { confirmAccount } from "@/api/authApi"
import { guardIsErrorBackend } from "@/types/index"
import Spinner from "@/components/Spinner"


export default function ConfirmAccountView() {

  const params = useParams()
  const token = params.tokenConfirm!
  
  const mutation = useMutation({
    mutationFn: confirmAccount,
  })

  useEffect(() => {
    mutation.mutate(token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ token])

  
  return (
    <>
    <h1 className="text-5xl font-black text-white">Confirm your Account</h1>
    
    {mutation.isPending ? 
      (
        <Spinner />
      ):
      (
        mutation.isError? 
        (
         
          <nav className="text-center my-10 flex flex-col space-y-4">
            <p className="text-2xl text-red-400 font-bold">{guardIsErrorBackend(mutation.error)? mutation.error.details.token : mutation.error.message}</p>
            <Link to='/auth/login' className="text-center text-gray-300 font-normal">
            Already have an account? <span className="text-fuchsia-500 font-bold">Sign in</span></Link>
            <Link to={'/auth/request-token'} className="text-center text-gray-300 font-normal">Request new <span className="text-fuchsia-500 font-bold"> confirmation</span></Link>

          </nav>
        )
        :
        (
        
          <nav className="text-center my-10 flex flex-col space-y-4">
            <p className="text-2xl text-lime-300 font-bold">Great, {mutation.data}!</p>
            <Link to='/auth/login' className="text-center text-gray-300 font-normal">
            Already have an account? <span className="text-fuchsia-500 font-bold">Sign in</span></Link>
          </nav>
        )
      )
    }
    </>
  )
}
