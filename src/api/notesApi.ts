import api from "@/lib/axios";
import type { NotesFormData, NoteType, Project, Task } from "../types";
import { isAxiosError } from "axios";

type NotesApi = {
  formData: NotesFormData,
  projectId: Project['_id'],
  taskId: Task['_id'],
  noteId: NoteType['_id']
}

export const createNote = async ({projectId, taskId, formData} : (Pick<NotesApi, 'projectId' | 'taskId' | 'formData'>) )=> {
  try{
    const {data} = await api.post(`/projects/${projectId}/tasks/${taskId}/notes`, formData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }

    throw error
  }
}

export const deleteNote = async ({projectId, taskId, noteId} : (Pick<NotesApi, 'projectId' | 'taskId' | 'noteId'>) )=> {
  try{
    const {data} = await api.delete(`/projects/${projectId}/tasks/${taskId}/notes/${noteId}`)
    return data
  }
  catch(error){
    console.log(error)
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }

    throw error
  }
}