import { IUser } from './IUser'
import { IUserApi } from './IUserApi'
import { UserService } from './UserService'
import { UpdateUserData } from './IUserPort'
import {
    ControllerType,
    IControllerMethodInput,
    ControllerMethodOutput,
} from '../../IController'
import { right } from '@sweet-monads/either'

export class UserController implements ControllerType<UserController> {
    constructor(private readonly userService: UserService) {}
    async getUser(
        input: IControllerMethodInput<{ email: string }>
    ): ControllerMethodOutput<IUser> {
        return right(await this.userService.getUserByEmail(input.data.email))
    }

    async getCurrent({
        context,
    }: IControllerMethodInput<void>): ControllerMethodOutput<IUser> {
        const user = await this.userService.getUserByEmail(context.email)
        return right(user)
    }

    async updateUser({
        data,
    }: IControllerMethodInput<{
        email: string
        data: UpdateUserData
    }>): ControllerMethodOutput<IUser> {
        const { data: newData, email } = data
        const user = await this.userService.updateUser(email, newData)
        return user
    }
}
