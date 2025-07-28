import {toast} from 'react-toastify'
import type { NavigateFunction } from 'react-router-dom'
import { formatErrorsFrontend } from '@/utils/index'

export const handleOnErrorMutation = (error: Error) => {
  if ('details' in error){
    if (!error.details){
      toast.error(error.message, {className: 'border border-red-500', toastId: error.message})
    }
  } else{
    const message = formatErrorsFrontend(error)
    toast.error(message, {className: 'border border-red-500', toastId: message})
  }
}

export const handleOnSuccessMutation = (data:string, navigate: NavigateFunction) => {
  navigate('/')
  toast.success(data, {className: 'border border-lime-400', toastId: data})
}
