import { Either } from '@sweet-monads/either'
import { ErrorEntity } from '../../errors'
import { TransactionEntity } from './transaction.entity'

export interface ITransPort {
    addTransaction(data: {
        user_email: string
        budget_id: number
        name: string
        amount: number
        date: Date
    }): Promise<Either<ErrorEntity, TransactionEntity>>
}
