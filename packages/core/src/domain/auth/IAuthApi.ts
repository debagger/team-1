import { Either } from '@sweet-monads/either'
import { ErrorEntity } from '../error/entities/ErrorEntity'
import { IUser } from '../user/IUser'

export interface IRegisterUserInput extends IUser {
    password: string
}

export interface ILoginOutput {
    token: string
}

export interface IAuthApi {
    register(input: IRegisterUserInput): Promise<Either<ErrorEntity, IUser>>
    login(
        email: string,
        password: string
    ): Promise<Either<ErrorEntity, ILoginOutput>>
}
