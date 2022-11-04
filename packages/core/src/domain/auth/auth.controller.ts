import { Either } from '@sweet-monads/either'
import { InferType, object, string } from 'yup'
import {
    ControllerMethodOutput,
    ControllerType,
    Input,
} from '../../common/controller.types'
import { ValidateControllerInput } from '../../common/validate.decorator'
import { ErrorEntity } from '../../errors/entities/error.entity'
import { IUser } from '../user/IUser'
import { AuthService } from './auth.service'
import { loginDto } from './dto/login.dto'
import { registerDto } from './dto/register.dto'
import { ILoginOutput } from './IAuthApi'

export class AuthController implements ControllerType<AuthController> {
    constructor(private readonly authService: AuthService) {}

    @ValidateControllerInput(registerDto)
    async register({
        data,
    }: Input<InferType<typeof registerDto>>): ControllerMethodOutput<IUser> {
        const { password, ...userData } = data
        return await this.authService.register(
            { ...userData, avatar: null },
            password
        )
    }

    @ValidateControllerInput(loginDto)
    async login({
        data,
    }: Input<
        InferType<typeof loginDto>
    >): ControllerMethodOutput<ILoginOutput> {
        const { email, password } = data
        return this.authService.login(email, password)
    }
}
