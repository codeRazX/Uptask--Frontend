import api from "@/lib/axios"
import type { FormDataProfileType, FormDataProfilePassword } from "../types"
import { isAxiosError } from "axios"

export const updateProfile = async (formdata : FormDataProfileType) => {
  try{
    const {data} = await api.put('/auth/profile', formdata)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }

    throw error
  }
}

export const updatePassword = async (formData : FormDataProfilePassword) => {
  try{
    const {data} = await api.put('/auth/profile/password', formData)
    return data
  }
  catch(error){
    
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }

    throw error
  }
}