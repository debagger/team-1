import { Either } from '@sweet-monads/either'
import { ControllerType, IControllerMethodInput } from '../../IController'
import { ErrorEntity } from '../error/entities/ErrorEntity'
import { IUser } from '../user/IUser'
import { AuthService } from './AuthService'
import { IAuthApi, ILoginOutput, IRegisterUserInput } from './IAuthApi'

export class AuthController implements ControllerType<AuthController> {
    constructor(private readonly authService: AuthService) {}
    async register({
        data,
    }: IControllerMethodInput<IRegisterUserInput>): Promise<
        Either<ErrorEntity, IUser>
    > {
        const { password, ...userData } = data
        return await this.authService.register(userData, password)
    }
    async login({
        data,
    }: IControllerMethodInput<{ email: string; password: string }>): Promise<
        Either<ErrorEntity, ILoginOutput>
    > {
        const { email, password } = data
        return this.authService.login(email, password)
    }
}
