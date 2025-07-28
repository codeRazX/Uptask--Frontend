import { isAxiosError } from "axios"
import  {TaskSchema, type TaskFormData, type Project, type Task, type TaskStatusType } from "../types"
import api from "@/lib/axios"


type TaskAPI = {
  formData: TaskFormData,
  projectId: Project['_id'],
  taskId: Task['_id'],
  status: TaskStatusType
}

export const createTask = async ({projectId, formData} : Pick<TaskAPI, 'projectId' | 'formData'>) => {
  try{
    const {data} = await api.post(`/projects/${projectId}/tasks`, formData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data      
    }
    throw error
  }
}

export const getTaskById = async ({projectId, taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) => {
  try{
    const {data} = await api(`/projects/${projectId}/tasks/${taskId}`)
    const response = TaskSchema.safeParse(data)
    if(response.success){
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

export const updateTask = async ({formData, projectId, taskId} :  Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) => {
  try{
    const {data} = await api.put(`/projects/${projectId}/tasks/${taskId}`, formData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }

    throw error
  }
}

export const deleteTask = async ({projectId, taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) => {
  try{
    const {data} = await api.delete(`/projects/${projectId}/tasks/${taskId}`)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }

    throw error
  }
}

export const updateStatus = async ({projectId, taskId, status}: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) => {
  try{
    const {data} = await api.patch(`/projects/${projectId}/tasks/${taskId}/status`, {status})
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}