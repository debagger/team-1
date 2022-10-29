import { Either } from '@sweet-monads/either'
import { ErrorEntity } from '../error/entities/ErrorEntity'
import { IUser } from '../user/IUser'
import { AuthService } from './AuthService'
import { IAuthApi, ILoginOutput, IRegisterUserInput } from './IAuthApi'

export class AuthController implements IAuthApi {
    constructor(private readonly authService: AuthService) {}
    async register({
        password,
        ...userData
    }: IRegisterUserInput): Promise<Either<ErrorEntity, IUser>> {
        return await this.authService.register(userData, password)
    }

    async login(
        email: string,
        password: string
    ): Promise<Either<ErrorEntity, ILoginOutput>> {
        return this.authService.login(email, password)
    }
}
