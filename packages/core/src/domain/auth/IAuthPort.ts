import { Either } from '@sweet-monads/either'
import { ErrorEntity } from '../error/entities/ErrorEntity'

export interface ISetUserPasswordHashInput {
    email: string
    hash: string
}

export interface IGetUserEmailByTokenOutput {
    email: string
}

export interface IAuthPort {
    getUserPasswordHash(email: string): Promise<Either<ErrorEntity, string>>
    setUserPasswordHash(
        data: ISetUserPasswordHashInput
    ): Promise<Either<ErrorEntity, void>>
    getUserEmailByToken(
        token: string
    ): Promise<Either<ErrorEntity, IGetUserEmailByTokenOutput>>
    addUserToken(
        userEmail: string,
        token: string
    ): Promise<Either<ErrorEntity, void>>
}
