import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { handleOnErrorMutation } from "@/lib/query/handlerQuerys"
import { addMemberById } from "@/api/TeamApi"
import type { Project, TeamMemberType } from "@/types/index"

type SearchMemberTeamProps = {
  member: TeamMemberType,
  projectId: Project['_id'],
  handleReset : () => void
}

export default function SearchMemberTeam({member, projectId, handleReset} : SearchMemberTeamProps) {
  
  const queryClient = useQueryClient()
  
  const {mutate} = useMutation({
    mutationFn: addMemberById,
    onError: handleOnErrorMutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
      toast.success(data, {className: 'border border-lime-400', toastId: data})
      handleReset()
    }
  })

  return (
    <>
    <p className="font-bold text-center">Results:</p>
    <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-5">
      <p>{member.name}</p>
      <button 
      className="text-purple-600 w-full sm:w-auto hover:text-purple-800 hover:bg-purple-100 py-2 px-10 font-bold cursor-pointer"
      onClick={() => mutate({projectId, memberId : member._id})}
      >
        Add to project
      </button>
    </div>
    </>
  )
}
