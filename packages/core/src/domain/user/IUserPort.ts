import { Either } from '@sweet-monads/either'
import { ErrorEntity } from '../error/entities/ErrorEntity'
import { IUser, UserId } from './IUser'

export interface IUserLoadByIdCommand {
    id: UserId
}

export interface IUserPort {
    loadById(id: IUserLoadByIdCommand): Promise<Either<ErrorEntity, IUser>>
    create(user: Omit<IUser, 'id'>): Promise<Either<ErrorEntity, IUser>>
    update()
}
