import { Either, left, right } from '@sweet-monads/either'
import { ErrorEntity } from '../../../errors'
import { NotFoundErrorEntity } from '../../../errors/entities/not-found-error.entity'
import { BudgetUserEntity, BudgetUserRoleEnum } from '../budget-user.entity'
import { BudgetEntity } from '../budget.entity'
import { IBudgetPort } from '../budget.port'
import { BudgetService } from '../budget.service'

describe('budget', () => {
    let budgetMock: ReturnType<typeof createBudgetMock>
    beforeEach(() => {
        budgetMock = createBudgetMock()
    })
    test('create budget', async () => {
        const { service, budgets, budgetUsers } = budgetMock

        const b = await service.createBudget('test@test.com', 'default')
        if (b.isRight()) {
            expect(b.value.name).toEqual('default')
            expect(budgetUsers[0].budget_id).toEqual(b.value.id)
            expect(budgetUsers[0].user_email).toEqual('test@test.com')
        } else {
            fail(b.value)
        }
    })

    test('check role test', async () => {
        budgetMock.budgets.push({ id: 1, name: 'default' })
        budgetMock.budgetUsers.push({
            budget_id: 1,
            id: 1,
            role: BudgetUserRoleEnum.OWNER,
            user_email: 'user1@test.ru',
        })

        const res1 = await budgetMock.service.checkRole(
            'user1@test.ru',
            1,
            BudgetUserRoleEnum.OWNER
        )
        expect(res1.isRight()).toBe(true)

        const res2 = await budgetMock.service.checkRole(
            'user2@test.ru',
            1,
            BudgetUserRoleEnum.OWNER
        )
        expect(res2.isLeft()).toBe(true)

        const res3 = await budgetMock.service.checkRole(
            'user1@test.ru',
            1,
            BudgetUserRoleEnum.COLLAB
        )
        expect(res3.isLeft()).toBe(true)

        const res4 = await budgetMock.service.checkRole(
            'user1@test.ru',
            2,
            BudgetUserRoleEnum.OWNER
        )
        expect(res4.isLeft()).toBe(true)
    })

    test('delete budget', async () => {
        budgetMock.budgets.push({ id: 1, name: 'default' })
        const res = await budgetMock.service.deleteBudget('user1@test.ru', 1)
        expect(res.isLeft()).toBe(true)

        budgetMock.budgetUsers.push({
            budget_id: 1,
            id: 1,
            role: BudgetUserRoleEnum.OWNER,
            user_email: 'user1@test.ru',
        })

        const res2 = await budgetMock.service.deleteBudget('user1@test.ru', 1)
        expect(res2.isRight()).toBe(true)
        expect(budgetMock.budgets.length).toEqual(0)
        expect(budgetMock.budgetUsers.length).toEqual(0)
    })
})

export function createBudgetMock() {
    const budgets: BudgetEntity[] = []
    let next_budget_id = 0
    const budgetUsers: BudgetUserEntity[] = []
    let next_budget_user_id = 0

    const port: IBudgetPort = {
        async createBudget(name) {
            const budget: BudgetEntity = { name, id: next_budget_id++ }
            budgets.push(budget)
            return right(budget)
        },
        getUserBudgets: function (
            user_email: string
        ): Promise<Either<ErrorEntity, BudgetEntity[]>> {
            throw new Error('Function not implemented.')
        },
        getBudgetById: function (
            budget_id: number
        ): Promise<Either<ErrorEntity, BudgetEntity>> {
            throw new Error('Function not implemented.')
        },
        updateBudget: function (
            budget: BudgetEntity
        ): Promise<Either<ErrorEntity, BudgetEntity>> {
            throw new Error('Function not implemented.')
        },
        deleteBudget: async function (
            budget_id: number
        ): Promise<Either<ErrorEntity, void>> {
            const idx = budgets.findIndex((b) => b.id === budget_id)
            if (idx === -1)
                return left(
                    new NotFoundErrorEntity(`Бюджет id:${budget_id} не найден `)
                )
            const [deleted] = budgets.splice(idx, 1)
            return right(undefined)
        },
        createBudgetUser: async function (
            user: Omit<BudgetUserEntity, 'id'>
        ): Promise<Either<ErrorEntity, BudgetUserEntity>> {
            const newUser: BudgetUserEntity = {
                id: next_budget_user_id++,
                budget_id: user.budget_id,
                role: user.role,
                user_email: user.user_email,
            }
            budgetUsers.push(newUser)
            return right(newUser)
        },
        updateBudgetUser: function (
            id: number,
            date: Omit<BudgetUserEntity, 'id'>
        ): Promise<Either<ErrorEntity, BudgetUserEntity>> {
            throw new Error('Function not implemented.')
        },
        deleteBudgetUser: async function (
            id: number
        ): Promise<Either<ErrorEntity, void>> {
            const idx = budgetUsers.findIndex((user) => user.id === id)
            if (idx === -1)
                return left(
                    new NotFoundErrorEntity(`Пользователь id:${id} не найден`)
                )
            budgetUsers.splice(idx, 1)
            return right(undefined)
        },
        getBudgetUsers: async function (
            budget_id: number
        ): Promise<Either<ErrorEntity, BudgetUserEntity[]>> {
            return right(budgetUsers.filter((u) => u.budget_id === budget_id))
        },
    }

    const service = new BudgetService(port)

    return { budgets, budgetUsers, port, service }
}
