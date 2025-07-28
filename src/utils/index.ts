import {toast} from 'react-toastify'
import type { Project, TaskStatusType, UserType } from '../types'

export const formatErrorsFrontend = (error : Error) : string => 'code' in error && error.code === 'ERR_NETWORK'? 'Oops, there was a connection problem. It might be a server error or an issue with your internet connection. Please try again later' : error.message

export const handleInternalError = (error : Error) => {
  const message = formatErrorsFrontend(error)
  toast.error(message, {className: 'border border-red-500', toastId: message})
}

export const formatDate = (isoString: string) : string => {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    'year': 'numeric',
    'month': 'long',
    'day': 'numeric',
  })
}

export const isManager = (userId: UserType['_id'], manager: Project['manager']) => userId === manager

export const STATUS_TASK : Record<TaskStatusType, string> = {
  pending: 'Pending',
  inProgress: 'In Progress',
  onHold: 'On Hold',
  underReview: 'Under Review',
  completed: 'Completed'
} as const

export const STATUS_BORDER_COLOR : Record<TaskStatusType, string> = {
  pending: 'border-t-slate-500', 
  inProgress: 'border-t-red-500', 
  onHold: 'border-t-blue-500',
  underReview: 'border-t-amber-500', 
  completed: 'border-t-emerald-500'
} as const

export const STATUS_TEXT_COLOR : Record<TaskStatusType, string> = {
  pending: 'text-slate-500', 
  inProgress: 'text-red-500', 
  onHold: 'text-blue-500',
  underReview: 'text-amber-500', 
  completed: 'text-emerald-500'
} as const


Object.freeze(STATUS_TASK)
Object.freeze(STATUS_BORDER_COLOR)
Object.freeze(STATUS_TEXT_COLOR)