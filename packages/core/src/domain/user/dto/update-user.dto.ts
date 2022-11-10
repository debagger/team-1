import { object, string } from 'yup'

export const UpdateUserDto = object({
    email: string().email(),
    data: object({
        firstName: string().defined(),
        lastName: string().defined(),
        avatar: string(),
    }),
})
