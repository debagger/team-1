import { chain, left, merge, mergeInMany, right } from '@sweet-monads/either'
import { ErrorEntity } from '../../errors'
import { NotFoundErrorEntity } from '../../errors/entities/not-found-error.entity'
import { BudgetUserRoleEnum } from './budget-user.entity'
import { IBudgetPort } from './budget.port'

export class BudgetService {
    constructor(private readonly budgetPort: IBudgetPort) {}

    async createBudget(owner_email: string, name: string) {
        return await this.budgetPort.createBudget(name).then(
            chain(async (b) =>
                this.budgetPort
                    .createBudgetUser({
                        budget_id: b.id,
                        role: BudgetUserRoleEnum.OWNER,
                        user_email: owner_email,
                    })
                    .then(chain(async (u) => right(b)))
            )
        )
    }

    async deleteBudget(user_email: string, budget_id: number) {
        return await this.checkRole(
            user_email,
            budget_id,
            [BudgetUserRoleEnum.OWNER]
        ).then(
            chain(async () => {
                this.budgetPort
                    .getBudgetUsers(budget_id)
                    .then(
                        chain(async (users) =>
                            merge(
                                await Promise.all(
                                    users.map((user) =>
                                        this.budgetPort.deleteBudgetUser(
                                            user.id
                                        )
                                    )
                                )
                            )
                        )
                    )
                return this.budgetPort.deleteBudget(budget_id)
            })
        )
    }

    async checkRole(
        user_email: string,
        budget_id: number,
        role: BudgetUserRoleEnum[]
    ) {
        const users = await this.budgetPort.getBudgetUsers(budget_id)
        return users.chain((users) =>
            users.find(
                (user) => user.user_email === user_email && user.role in role
            )
                ? right(true)
                : left(new NotFoundErrorEntity(`Недостаточно прав`))
        )
    }

    async getBudgets(user_email: string) {
        return this.budgetPort.getUserBudgets(user_email)
    }

    async updateBudgetName(email: string, budget_id: number, name: string) {
        return this.checkRole(email, budget_id, [BudgetUserRoleEnum.OWNER]).then(
            chain(async () =>
                this.budgetPort.updateBudget({ id: budget_id, name })
            )
        )
    }
    async getBudgetInfo(email: string, budget_id: number) {
        return this.checkRole(email, budget_id, [BudgetUserRoleEnum.OWNER,BudgetUserRoleEnum.COLLAB,BudgetUserRoleEnum.READONLY]).then(
            chain(async () =>
                this.budgetPort.getBudgetInfo(budget_id)
            )
        )
    }
}
