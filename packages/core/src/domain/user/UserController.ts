import { IUser } from './IUser'
import { IUserApi } from './IUserApi'
import { UserService } from './UserService'
import { UpdateUserData } from './IUserPort'

export class UserController implements IUserApi {
    constructor(private readonly userService: UserService) {}
    getUser(email: string): Promise<IUser> {
        throw new Error('Method not implemented.')
    }
    updateUser(email: string, data: UpdateUserData): Promise<IUser> {
        const user = this.userService.updateUser(email, data)
        throw new Error('Method not implemented.')
        // return Не разобрался что и как возвращать
    }
}
