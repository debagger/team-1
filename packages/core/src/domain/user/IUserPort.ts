import { ErrorEntity } from '../error/entities/ErrorEntity'
import { IUser } from './IUser'

export type UpdateUserData = Omit<IUser, 'email'>

export interface IUserPort {
    getUserByEmail(email: string): Promise<IUser>
    create(user: IUser): Promise<IUser>
    update(email: string, data: UpdateUserData): Promise<IUser>
    delete(email: string): Promise<void>
}
