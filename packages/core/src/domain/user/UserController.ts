import { IUser } from './IUser'
import { IUserApi } from './IUserApi'
import { UserService } from './UserService'
import { UpdateUserData } from './IUserPort'
import {
    ControllerType,
    IControllerMethodInput,
    IControllerMethodOutput,
} from '../../IController'
import { right } from '@sweet-monads/either'

export class UserController implements ControllerType<UserController> {
    constructor(private readonly userService: UserService) {}
    async getUser(
        input: IControllerMethodInput<{ email: string }>
    ): IControllerMethodOutput<IUser> {
        return right(await this.userService.getUserByEmail(input.data.email))
    }

    async updateUser({
        data,
    }: IControllerMethodInput<{
        email: string
        data: UpdateUserData
    }>): IControllerMethodOutput<IUser> {
        const { data: newData, email } = data
        const user = await this.userService.updateUser(email, newData)
        return user
    }
}
