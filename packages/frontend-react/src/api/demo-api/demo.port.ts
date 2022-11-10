import { IPorts } from 'core'
import { IBudgetPort } from 'core/dist/domain/budget/budget.port'
import { ITransPort } from 'core/dist/domain/transactions/transactions.port'
import { AuthPort } from './auth.port'
import { BudgetPort } from './budget.port'
import { PlanPort } from './plan.port'
import { TransPort } from './trans.port'
import { UserPort } from './user.port'

export type IAuthPort = IPorts['auth']
export type IUserPort = IPorts['users']

export class DemoPort implements IPorts {
    users = new UserPort()
    auth = new AuthPort()
    budget = new BudgetPort()
    transaction = new TransPort()
    plan = new PlanPort()
}
