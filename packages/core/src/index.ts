import { AuthController } from './domain/auth/auth.controller'
import { AuthService } from './domain/auth/auth.service'
import { UserController } from './domain/user/user.controller'
import { UserService } from './domain/user/user.service'
import {
    ClientApiType,
    ControllerType,
    ControllerMetodType,
    Input,
    ControllerMethodOutput,
    IControllerContext,
} from './common/controller.types'
import { IPorts } from './ports.interface'
import { Either, left } from '@sweet-monads/either'
import { NotFoundErrorEntity } from './errors/entities/not-found-error.entity'
import { InternalApi } from './internal-api.interface'
import { BudgetService } from './domain/budget/budget.service'
import { BudgetController } from './domain/budget/budget.controller'
import { TransactionsController } from './domain/transactions/transactions.controller'
import { TransactionsService } from './domain/transactions/transactions.service'
import { PlanService } from './domain/plan/plan.service'
import { PlanController } from './domain/plan/plan.controller'

export type ApiModuleName = Extract<keyof InternalApi, string>

export type ApiMethodName<ModuleName extends ApiModuleName> = Extract<
    keyof InternalApi[ModuleName],
    string
>

export type ExtractMethodInput<Method> = Method extends ControllerMetodType<
    infer D,
    infer _
>
    ? D
    : never

export type ExtractMethodOutput<Method> = Method extends ControllerMetodType<
    infer _,
    infer O
>
    ? ControllerMethodOutput<O>
    : never

type RequestContext = {
    token?: string | null
}

type RequestInput<D> = {
    context: RequestContext
    data: D
}

export type ApiRequest = <
    ModuleName extends ApiModuleName,
    MethodName extends ApiMethodName<ModuleName>
>(
    moduleName: ModuleName,
    methodName: MethodName,
    input: RequestInput<ExtractMethodInput<InternalApi[ModuleName][MethodName]>>
) => ExtractMethodOutput<InternalApi[ModuleName][MethodName]>

export function getCoreApiRequest(ports: IPorts): ApiRequest {
    const userService = new UserService(ports.users)
    const authService = new AuthService(ports.auth, userService)
    const budgetService = new BudgetService(ports.budget)
    const transactionsService = new TransactionsService(ports.transaction)
    const planService = new PlanService(ports.plan)

    const users = new UserController(userService)
    const auth = new AuthController(authService)
    const budget = new BudgetController(budgetService)
    const transactions = new TransactionsController(transactionsService)
    const plan = new PlanController(planService)

    const api: InternalApi = { users, auth, budget, transactions, plan }

    const request: ApiRequest = (async (
        moduleName: string,
        methodName: string,
        input: RequestInput<unknown>
    ) => {
        const token = input.context?.token

        const context: IControllerContext = {
            email: null,
            isAuthenticated: false,
        }
        if (token) {
            const email = await ports.auth.getUserEmailByToken(token)

            if (email.isRight()) {
                context.email = email.value.email
                context.isAuthenticated = true
            }
        }
        const methodInput: Input<unknown> = {
            context,
            data: input.data,
        }
        const controller = api[moduleName]
        if (!controller)
            return left(
                new NotFoundErrorEntity(`Неправильное имя модуля ${moduleName}`)
            )

        if (!controller[methodName])
            return left(
                new NotFoundErrorEntity(`Неправильное имя метода ${methodName}`)
            )
        const response = await controller[methodName](methodInput)

        console.log({
            moduleName,
            methodName,
            input,
            response: response.value ? response.value : response,
        })
        return response
    }) as any

    return request
}

export type ICoreApi = {
    [K in keyof InternalApi]: ControllerType<InternalApi[K]>
}

export type ICoreClientApi = {
    [K in keyof ICoreApi]: ClientApiType<ICoreApi[K]>
}

export { Input as IControllerMethodInput } from './common/controller.types'

export { Either, left, right } from '@sweet-monads/either'

export * from './domain'

export { IPorts } from './ports.interface'
