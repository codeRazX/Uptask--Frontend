import { ProjectSchema, type Project, type ProjectFormData } from "@/types/index"
import api from "@/lib/axios/index"
import { isAxiosError } from "axios"
import { DashboardProjectsSchema } from "@/types/index"

export const createProject = async (formData: ProjectFormData) => {
  try{
    const { data } = await api.post('/projects', formData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data      
    }
    throw error
  }
}

export const getProjects = async () => {
  try{
    const {data} = await api('/projects')
    const response = DashboardProjectsSchema.safeParse(data)
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

export const getProjectById = async (projectId: Project['_id']) => {
  try{
    const { data } = await api(`/projects/${projectId}`)
    const response = ProjectSchema.safeParse(data)
    
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
type ProjectUpdateAPIType = {
  formData: ProjectFormData,
  projectId: Project['_id']
}

export const updateProject = async ({formData, projectId}: ProjectUpdateAPIType) => {
  try{
    const { data } = await api.put(`/projects/${projectId}`, formData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data      
    }
    throw error
  }
}

export const deleteProject = async (projectId: Project['_id']) => {
  try{
    const { data } = await api.delete(`/projects/${projectId}`)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data      
    }
    throw error
  }
}