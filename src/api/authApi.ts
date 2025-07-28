import { isAxiosError } from "axios"
import api from "@/lib/axios"
import {UserSchema, type UserRegistrationForm,type UserLoginForm, type RequestConfirmationTokenForm,type ForgotPasswordForm, type FormDataPassword, type checkPasswordType} from "@/types/index"

export const createAccount = async (userData: UserRegistrationForm) => {
  try{
    const {data} = await api.post('/auth/account', userData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data      
    }
    throw error
  }
}


export const postLogin = async (userData: UserLoginForm) => {
  try{
    const {data} = await api.post('/auth/login', userData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data      
    }
    throw error
  }
 
}

export const confirmAccount = async (token : string) => {
  try{
    const {data} = await api.post('/auth/confirm-account', {token})
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data      
    }
    throw error
  }
}


export const requestNewTokenAuth = async (formDataEmail : RequestConfirmationTokenForm) => {
  try{
    const {data} = await api.post('/auth/request-token', formDataEmail)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data      
    }
    throw error
  }
}


export const requestResetPassword = async (formDataEmail : ForgotPasswordForm) => {
  try{
    const {data} = await api.post('/auth/forgot-password', formDataEmail)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data      
    }
    throw error
  }
}



export const requestNewPassword = async (formDataPassword : FormDataPassword) => {
  try{
    const {data} = await api.post('/auth/new-password', formDataPassword)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data      
    }
    throw error
  }
}

export const getUserInfo = async () => {
  try{
    const {data} = await api.get('/auth/user')
    const result = UserSchema.safeParse(data)
    if (result.success){
      return result.data
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

export const logout = async () => {
  try{
    const {data} = await api.post('/auth/logout')
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data      
    }
    throw error
  }
}

export const checkPassword = async (formDataPassword: checkPasswordType) => {
  try{
    const {data} = await api.post('/auth/user/check-password', formDataPassword)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data      
    }
    throw error
  }
}


