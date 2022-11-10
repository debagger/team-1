import { Either } from '@sweet-monads/either'
import { ErrorEntity } from '../../errors'
import { IUser } from '../user'
import { BudgetUserEntity } from './budget-user.entity'
import { BudgetEntity } from './budget.entity'

export interface IBudgetPort {
    createBudget(name: string): Promise<Either<ErrorEntity, BudgetEntity>>

    getUserBudgets(
        user_email: string
    ): Promise<Either<ErrorEntity, BudgetEntity[]>>

    getBudgetById(budget_id: number): Promise<Either<ErrorEntity, BudgetEntity>>

    updateBudget(
        budget: BudgetEntity
    ): Promise<Either<ErrorEntity, BudgetEntity>>

    deleteBudget(budget_id: number): Promise<Either<ErrorEntity, void>>

    createBudgetUser(
        user: Omit<BudgetUserEntity, 'id'>
    ): Promise<Either<ErrorEntity, BudgetUserEntity>>

    updateBudgetUser(
        id: number,
        date: Omit<BudgetUserEntity, 'id'>
    ): Promise<Either<ErrorEntity, BudgetUserEntity>>

    deleteBudgetUser(id: number): Promise<Either<ErrorEntity, void>>

    getBudgetUsers(
        budget_id: number
    ): Promise<Either<ErrorEntity, BudgetUserEntity[]>>

    getBudgetInfo(
        budget_id: number
    ): Promise<Either<ErrorEntity, {info: BudgetEntity, users: BudgetUserEntity[]}>>
}
