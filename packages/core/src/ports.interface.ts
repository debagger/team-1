import { IAuthPort } from './domain/auth/IAuthPort'
import { IUserPort } from './domain/user/IUserPort'

export interface IPorts {
    users: IUserPort
    auth: IAuthPort
}
