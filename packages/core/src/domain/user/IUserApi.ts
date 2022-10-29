import { IUser } from './IUser'

export interface IUserApi {
    getUser(email: string): Promise<IUser>
}
