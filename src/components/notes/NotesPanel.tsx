import NotesAddForm from "./NotesAddForm";
import NoteDetails from "./NoteDetails";
import type { NoteType } from "@/types/index";


type NotesPanelProps = {
  notes: NoteType[],
}

export default function NotesPanel({notes} : NotesPanelProps) {

 
  return (
    <>
    <NotesAddForm />
    
    <p className="text-2xl font-bold text-slate-600 my-5">Notes</p>
    {
      notes.length? 
      (
        <ul className="divide-y divide-gray-100">
          {notes.map(note => (
            <NoteDetails key={note._id} note={note} />
          ))}
        </ul>
      )
      :
      (
        <p className="text-center text-gray-500 pt-3">No notes to show</p>
      )
    }
    </>
  )
}
