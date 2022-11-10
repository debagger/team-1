import { IUser } from './IUser'
import { UserService } from './user.service'
import { UpdateUserData } from './IUserPort'
import {
    ControllerType,
    Input,
    ControllerMethodOutput,
} from '../../common/controller.types'
import { right } from '@sweet-monads/either'
import { ValidateControllerInput } from '../../common/validate.decorator'
import { InferType, object, string } from 'yup'
import { UpdateUserDto } from './dto/update-user.dto'

export class UserController implements ControllerType<UserController> {
    constructor(private readonly userService: UserService) {}
    @ValidateControllerInput(object({ email: string().defined().email() }))
    async getUser(
        input: Input<{ email: string }>
    ): ControllerMethodOutput<IUser> {
        return right(await this.userService.getUserByEmail(input.data.email))
    }

    async getCurrent({ context }: Input<void>): ControllerMethodOutput<IUser> {
        const user = await this.userService.getUserByEmail(context.email)
        return right(user)
    }

    @ValidateControllerInput(UpdateUserDto)
    async updateUser({
        data,
    }: Input<InferType<typeof UpdateUserDto>>): ControllerMethodOutput<IUser> {
        const { data: newData, email } = data
        const user = await this.userService.updateUser(email, newData)
        return user
    }
}
