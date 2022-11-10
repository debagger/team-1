import { left, right } from '@sweet-monads/either'
import { date, number, object, string } from 'yup'
import { ControllerType, Input } from '../../common/controller.types'
import { ValidateControllerInput } from '../../common/validate.decorator'
import { ErrorEntity } from '../../errors'
import { TransactionEntity } from './transaction.entity'
import { TransactionsService } from './transactions.service'

export class TransactionsController
    implements ControllerType<TransactionsController>
{
    constructor(private readonly transService: TransactionsService) {}
    @ValidateControllerInput(
        object({
            budget_id: number(),
            name: string(),
            amount: number(),
            date: date(),
        })
    )
    async addTransaction(
        input: Input<{
            budget_id: number
            name: string
            amount: number
            date: Date
        }>
    ) {
        return this.transService.addTransaction(input.data, input.context.email)
    }

    @ValidateControllerInput(
        object({
            budget_id: number(),
        })
    )
    async getTransactions(input: Input<{ budget_id: number }>) {
        return this.transService.getTransactionByBudgetId(input.data.budget_id)
    }
}
