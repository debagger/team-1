import { object, string } from 'yup'

export const registerDto = object({
    email: string().defined(), //ID
    firstName: string().defined(),
    lastName: string().defined(),
    password: string().defined(),
    avatar: string().defined(),
})
