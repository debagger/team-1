import { IUser } from './IUser'
import { IUserApi } from './IUserApi'
import { UserService } from './UserService'

export class UserController implements IUserApi {
    constructor(private readonly userService: UserService) {}
    getUser(email: string): Promise<IUser> {
        throw new Error('Method not implemented.')
    }
}
