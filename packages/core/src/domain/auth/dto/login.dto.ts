import { object, string } from 'yup'

export const loginDto = object({
    email: string().email().defined(),
    password: string().min(5).defined(),
})
