import { Link } from "react-router-dom"



export default function NotFoundPage() {
  return (
    <div className="text-center text-white bg-gray-800 min-h-screen">
      <div className="py-10">
        <h1 className="text-5xl font-black">404 - Page Not Found</h1>
        <p className="mt-5 text-gray-300">Oops... that route does not exist,{' '}<span className="text-fuchsia-600 font-bold">maybe you want:</span></p>
       
        <Link to="/" className="mt-8 inline-block bg-fuchsia-600 hover:bg-fuchsia-700 py-3 px-6 rounded text-white font-bold uppercase">
          Back Home
        </Link>
      </div>
    </div>
  )
}