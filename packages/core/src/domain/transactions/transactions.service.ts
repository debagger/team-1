import { TransactionEntity } from './transaction.entity'
import { ITransPort } from './transactions.port'

export class TransactionsService {
    constructor(private readonly transPort: ITransPort) {}
    async addTransaction(
        data: {
            budget_id: number
            name: string
            amount: number
            date: Date
        },
        user_email: string
    ) {
        return this.transPort.addTransaction({ ...data, user_email })
    }

    async getTransactionByBudgetId(budget_id: number) {
        return this.transPort.getTransactionByBudgetId(budget_id)
    }
}
