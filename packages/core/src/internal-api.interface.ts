import { AuthController } from './domain/auth/auth.controller'
import { BudgetController } from './domain/budget/budget.controller'
import { UserController } from './domain/user/user.controller'

export interface InternalApi {
    users: UserController
    auth: AuthController
    budget: BudgetController
}
