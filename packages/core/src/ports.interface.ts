import { IAuthPort } from './domain/auth/IAuthPort'
import { IBudgetPort } from './domain/budget/budget.port'
import { ITransPort } from './domain/transactions/transactions.port'
import { IUserPort } from './domain/user/IUserPort'

export interface IPorts {
    users: IUserPort
    auth: IAuthPort
    budget: IBudgetPort
    transaction: ITransPort
}
