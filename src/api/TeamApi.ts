import { isAxiosError } from "axios"
import { type Project, type TeamMemberForm, type TeamMemberType, TeamMembersSchema } from "../types"
import api from "@/lib/axios"

export const findMemberById = async ({formData, projectId} : {formData: TeamMemberForm, projectId: Project['_id'] }) => {
  try{
    const {data} = await api.post(`/projects/${projectId}/team/find`, formData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
     throw error
  }
}

export const addMemberById = async ({projectId, memberId} : {projectId: Project['_id'], memberId: TeamMemberType['_id']}) => {
  try{
    const {data} = await api.post(`/projects/${projectId}/team/`, {memberId})
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
     throw error
  }
}

export const getAllMembersTeam = async (projectId: Project['_id']) => {
  try{
    const {data} = await api(`/projects/${projectId}/team/`)
    const response = TeamMembersSchema.safeParse(data)
    if (response.success){
      return response.data
    }
    throw new Error('The response was not what was expected')
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
     throw error
  }
}


export const removeMemberById = async ({projectId, memberId} : {projectId: Project['_id'], memberId: TeamMemberType['_id'] }) => {
  try{
    const {data} = await api.delete(`/projects/${projectId}/team/${memberId}`)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
     throw error
  }
}