import { object, string } from 'yup'

export const CreateBudgetDto = object({ name: string() })
