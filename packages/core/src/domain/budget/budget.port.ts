import { Either } from '@sweet-monads/either'
import { ErrorEntity } from '../../errors'
import { IUser } from '../user'
import { BudgetEntity } from './budget.entity'

export interface IBudgetPort {
    createBudget(
        owner_email: string,
        name: string
    ): Promise<Either<ErrorEntity, BudgetEntity>>

    getOwnedBudgets(
        owner_email: string
    ): Promise<Either<ErrorEntity, BudgetEntity[]>>

    getCollabBudgets(
        collab_email: string
    ): Promise<Either<ErrorEntity, BudgetEntity[]>>

    addCollaborator(
        budget_id: number,
        collab_email: string
    ): Promise<Either<ErrorEntity, void>>

    removeCollaborator(
        budget_id: number,
        user_email: string
    ): Promise<Either<ErrorEntity, void>>

    getCollaborators(budget_id: number): Promise<Either<ErrorEntity, IUser[]>>

    getBudgetById(budget_id: number): Promise<Either<ErrorEntity, BudgetEntity>>
}
