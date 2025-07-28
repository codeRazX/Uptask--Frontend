
export default function Spinner() {
  return (
    <div className="border-4 border-slate-400 rounded-full size-12 mt-20 mx-auto relative animate-bounce ">
      <div className="border-3 border-b-0 border-l-0 border-purple-400 rounded-full size-12 animate-spin absolute top-1/2 left-1/2 -translate-1/2"></div>
    </div>
  )
}
