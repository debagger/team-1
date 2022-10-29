import { IAuthApi } from './domain/auth/IAuthApi'
import { IUserApi } from './domain/user/IUserApi'

export interface IApi {
    users: IUserApi
    auth: IAuthApi
}
