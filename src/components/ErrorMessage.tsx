
export default function ErrorMessage({children} : {children: React.ReactNode}) {
  return (
    <div className="text-center p-3 my-2 bg-red-100 text-red-600 font-bold uppercase text-sm">
      {children}
    </div>
  )
}
