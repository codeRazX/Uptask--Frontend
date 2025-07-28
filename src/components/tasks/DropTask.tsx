import { useDroppable } from "@dnd-kit/core"


type DropTaskProps = {
  status: string
}

export default function DropTask({status} : DropTaskProps) {

  const {isOver, setNodeRef} = useDroppable({
    id: status
  })

  const style = {
    opacity: isOver ? 0.3 : undefined,
    transform: isOver? 'scale(0.9)' : undefined
  }

  return (

    <div 
      style={style}
      ref={setNodeRef}
      className="border border-dashed text-xs font-semibold border-slate-500 uppercase p-2 mt-5 grid place-content-center text-slate-500"
    >
        Drop task here 
    </div>
  )
}
