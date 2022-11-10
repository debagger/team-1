import { unhover } from '@testing-library/user-event/dist/hover'
import { Either, ErrorEntity, left, right } from 'core'
import { BudgetUserEntity } from 'core/dist/domain/budget/budget-user.entity'
import { BudgetEntity } from 'core/dist/domain/budget/budget.entity'
import { IBudgetPort } from 'core/dist/domain/budget/budget.port'
import { number } from 'yup'
import { withLocalStorage } from './with-local-storage.helper'

export class BudgetPort implements IBudgetPort {
    private withBudgets = withLocalStorage<BudgetEntity>('budgets')
    private withBudgetsUsers = withLocalStorage<BudgetUserEntity>('budget_users')

    async createBudget(name: string): Promise<Either<ErrorEntity, BudgetEntity>> {
        return right(
            this.withBudgets((items: any) => {
                const id = Number.isInteger(items.lastId) ? items.lastId + 1 : 0
                items.lastId = id
                const newBudget: BudgetEntity = { id, name }
                items[id] = newBudget
                return newBudget
            })
        )
    }

    async getUserBudgets(user_email: string): Promise<Either<ErrorEntity, BudgetEntity[]>> {
        const budgetIds = this.withBudgetsUsers((items) =>
            Object.values(items)
                .filter((u) => u.user_email === user_email)
                .map((u) => u.budget_id)
        )
        const budgets = this.withBudgets((items) => Object.values(items).filter((b) => budgetIds.includes(b.id)))
        return right(budgets)
    }

    getBudgetById(budget_id: number): Promise<Either<ErrorEntity, BudgetEntity>> {
        throw new Error('Method not implemented.')
    }
    async updateBudget(budget: BudgetEntity): Promise<Either<ErrorEntity, BudgetEntity>> {
        return this.withBudgets((items) => {
            if (items[budget.id]) {
                items[budget.id] = budget
                return right(items[budget.id])
            } else {
                return left(new ErrorEntity('Неправильный id бюджета'))
            }
        })
    }
    async deleteBudget(budget_id: number): Promise<Either<ErrorEntity, void>> {
        return this.withBudgets((items) => {
            if (items[budget_id]) {
                delete items[budget_id]
                return right(undefined)
            } else {
                return left(new ErrorEntity('Бюджет не найден'))
            }
        })

        throw new Error('Method not implemented.')
    }
    async createBudgetUser(user: Omit<BudgetUserEntity, 'id'>): Promise<Either<ErrorEntity, BudgetUserEntity>> {
        return this.withBudgetsUsers((items: any) => {
            const id = Number.isInteger(items.lastId) ? ++items.lastId : 0
            items.lastId = id
            const newUser: BudgetUserEntity = { id, ...user }
            items[id] = newUser
            return right(newUser)
        })
    }
    updateBudgetUser(id: number, date: Omit<BudgetUserEntity, 'id'>): Promise<Either<ErrorEntity, BudgetUserEntity>> {
        throw new Error('Method not implemented.')
    }
    async deleteBudgetUser(id: number): Promise<Either<ErrorEntity, void>> {
        return this.withBudgetsUsers((items) => {
            if (id in items) {
                delete items[id]
                return right(undefined)
            } else {
                return left(new ErrorEntity('Пользователь не найден'))
            }
        })
    }
    async getBudgetUsers(budget_id: number): Promise<Either<ErrorEntity, BudgetUserEntity[]>> {
        return right(
            this.withBudgetsUsers((items) => Object.values(items).filter((user) => user.budget_id === budget_id))
        )
    }
    async getBudgetInfo(budget_id: number): Promise<Either<ErrorEntity, {info: BudgetEntity, users: BudgetUserEntity[]}>>{
        return left(new ErrorEntity('Не знаю как реализовать логику ниже'))
        // return right( 
        //     {
        //         info: (await (await this.getBudgetById(budget_id))),
        //         users: undefined // (await this.getBudgetUsers(budget_id)).,
        //     }
        // )
    }
}
