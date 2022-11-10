import { object, number, string, date, mixed } from 'yup'

export const AddPlanDto = object({
    id: number(),
    budget_id: number(),
    type: string(),
    name: string(),
    amount: number(),
    date: date(), 
    repeat: string()
})
