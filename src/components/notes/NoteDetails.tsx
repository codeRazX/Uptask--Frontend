import { toast } from "react-toastify";
import { deleteNote } from "@/api/notesApi";
import { formatDate } from "@/utils/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys";
import useAuth from "@/hooks/useAuth";
import { useMemo } from "react";
import Spinner from "../Spinner";
import { useParams, useSearchParams } from "react-router-dom";
import type { NoteType } from "@/types/index";

type NoteDetailsProps = {
  note: NoteType
}

export default function NoteDetails({note} : NoteDetailsProps) {
  const queryClient = useQueryClient()
  const {data, isLoading} = useAuth()
  const params = useParams()
  const projectId = params.projectId!
  const [searchParams] = useSearchParams()
  const taskId = searchParams.get('viewTask')!
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

 const {mutate} = useMutation({
    mutationFn: deleteNote,
    onError: handleOnErrorMutation,
    onSuccess: (data) => {
      toast.success(data, {className: 'border border-lime-400', toastId: data})
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    }
  })

  const handleDelete = () => {
    const data = { projectId, taskId, noteId: note._id };
    mutate(data);
  }

  if (isLoading) return <Spinner />

  if (data) return (
    <li key={note._id} className="p-2 flex justify-between items-center gap-2">
      <div>
        <p className="capitalize break-words">
          {note.content}, by:{" "}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <button
          type="button"
          className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      )}
    </li>
  );
}
