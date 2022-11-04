import { IUser } from './IUser'
import { UpdateUserData } from './IUserPort'
import { Either } from '@sweet-monads/either'
import { ErrorEntity } from '../../errors/entities/error.entity'

export interface IUserApi {
    getUser(email: string): Promise<IUser>
    updateUser(
        email: string,
        data: UpdateUserData
    ): Promise<Either<ErrorEntity, IUser>>
}
