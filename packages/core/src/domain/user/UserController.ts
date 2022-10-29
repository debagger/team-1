import { IUser } from './IUser'
import { IUserApi } from './IUserApi'

export class UserController implements IUserApi {
    getUser(email: string): Promise<IUser> {
        throw new Error('Method not implemented.')
    }
}
