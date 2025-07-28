import { z } from 'zod'

/*TYPES AUTH*/
export const AuthSchema = z.object({
  name: z.string(),
  email: z.email(),
  current_password: z.string(),
  password: z.string(),
  confirm_password: z.string()
})

type Auth = z.infer<typeof AuthSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'email' | 'name' | 'password' | 'confirm_password'>
export type RequestConfirmationTokenForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type TokenType = {token: string}
export type NewPasswordForm = Pick<Auth, 'password' | 'confirm_password'>
export type FormDataPassword = NewPasswordForm & {token: string}
export type checkPasswordType = Pick<Auth, 'password'>



/*TYPES USER*/
export const UserSchema = AuthSchema.pick({
  name: true,
  email: true,
}).extend({_id: z.string()})
export type UserType = z.infer<typeof UserSchema>
export type FormDataProfileType = Pick<UserType, 'name' | 'email'>
export type FormDataProfilePassword = Pick<Auth, 'password' | 'current_password' | 'confirm_password'>


/*TYPES NOTES*/
export const NoteSchema = z.object({
  _id: z.string(),
  createdBy: UserSchema,
  content: z.string(),
  createdAt: z.string()
}) 
export const NotesSchema = z.array(NoteSchema)
export type NoteType = z.infer<typeof NoteSchema>
export type NotesFormData = Pick<NoteType, 'content'>


/**TYPES TASKS*/ 
export const TaskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed" ])

export const TaskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: TaskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  whoWorking: z.array(z.object({
    _id: z.string(),
    user: UserSchema.or(z.null()),
    status: TaskStatusSchema
  })),
  notes: NotesSchema
})

export const TaskSchemaDashboard = 
  TaskSchema.pick({
    _id: true,
    name: true,
    description: true,
    project: true,
    status: true
  })

export type Task = z.infer<typeof TaskSchema>
export type TaskDashboard = z.infer<typeof TaskSchemaDashboard>
export type TaskFormData = Pick<Task, 'description' | 'name'>
export type TaskStatusType = z.infer<typeof TaskStatusSchema>


/*TYPES PROJECTS*/ 
export const ProjectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  tasks: z.array(TaskSchemaDashboard),
  manager: z.string()
})

export const DashboardProjectSchema = 
  ProjectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true
})

export const DashboardProjectsSchema = z.array(DashboardProjectSchema)
export type Project = z.infer<typeof ProjectSchema>
export type DashboardProject = z.infer<typeof DashboardProjectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>


/*TYPES TEAM*/
export const TeamMemberSchema = UserSchema.pick({
  email: true,
  _id: true,
  name: true
})
export const TeamMembersSchema = z.array(TeamMemberSchema)
export type TeamMemberType = z.infer<typeof TeamMemberSchema>
export type TeamMemberForm = Pick<TeamMemberType, 'email'>


//GUARD
export const guardIsErrorBackend = (error: unknown) : error is {details: {[key: string]: string}} => typeof error === 'object' && error !== null && 'details' in error && error.details !== null && error.details !== undefined && typeof error.details === 'object'

