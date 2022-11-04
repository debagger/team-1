import { left, right } from '@sweet-monads/either'
import { ErrorEntity } from '../../errors'
import { NotFoundErrorEntity } from '../../errors/entities/not-found-error.entity'
import { IBudgetPort } from './budget.port'

export class BudgetService {
    constructor(private readonly budgetPort: IBudgetPort) {}

    async createBudget(owner_email: string, name: string) {
        return this.budgetPort.createBudget(owner_email, name)
    }

    async getOwnedBudgets(owner_email: string) {
        return this.budgetPort.getOwnedBudgets(owner_email)
    }

    async getCollabBudgets(collab_email: string) {
        return this.budgetPort.getCollabBudgets(collab_email)
    }

    async getCollaborators(user_email: string, budget_id: number) {
        const isOwner = await this.checkOwner(user_email, budget_id)
        return isOwner.asyncChain(async () =>
            this.budgetPort.getCollaborators(budget_id)
        )
    }

    private async checkOwner(user_email: string, budget_id: number) {
        return (await this.budgetPort.getBudgetById(budget_id)).chain(
            (budget) =>
                user_email !== budget.owner_email
                    ? left(
                          new NotFoundErrorEntity(
                              'Пользователь должен быть владельцем бюджета'
                          )
                      )
                    : right(true)
        )
    }
    async addCollabortor(
        user_email: string,
        budget_id: number,
        collab_email: string
    ) {
        return this.budgetPort.addCollaborator(budget_id, collab_email)
    }

    async removeCollaborator(
        user_email: string,
        budget_id: number,
        collab_email: string
    ) {
        return this.removeCollaborator(user_email, budget_id, collab_email)
    }
}
