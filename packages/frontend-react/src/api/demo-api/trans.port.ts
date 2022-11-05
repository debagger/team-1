import { Either, ErrorEntity, right } from 'core'
import { TransactionEntity } from 'core/dist/domain/transactions/transaction.entity'
import { ITransPort } from 'core/dist/domain/transactions/transactions.port'
import { withLocalStorage } from './with-local-storage.helper'

export class TransPort implements ITransPort {
    private withTrans = withLocalStorage<TransactionEntity>('transactions')
    async addTransaction(data: {
        user_email: string
        budget_id: number
        name: string
        amount: number
        date: Date
    }): Promise<Either<ErrorEntity, TransactionEntity>> {
        return this.withTrans((items) => {
            const id = Number.isInteger(items.lastId) ? (items as any).lastId + 1 : 1
            items.lastId = id
            items[id] = { ...data, id }
            return right(items[id])
        })
    }
}
