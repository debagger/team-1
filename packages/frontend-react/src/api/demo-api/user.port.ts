import { IUser, UpdateUserData } from 'core'
import { IUserPort } from './demo.port'
import { withLocalStorage } from './with-local-storage.helper'

export class UserPort implements IUserPort {
    private withUsers = withLocalStorage<IUser>('users')

    async getUserByEmail(email: string): Promise<IUser> {
        return this.withUsers((users) => users[email])
    }
    async create(user: IUser): Promise<IUser> {
        const { email } = user
        return this.withUsers((users) => {
            users[email] = { ...user }
            return this.getUserByEmail(email)
        })
    }
    update(email: string, data: UpdateUserData): Promise<IUser> {
        return this.withUsers((users) => {
            users[email] = { email, ...data }
            return this.getUserByEmail(email)
        })
    }
    async delete(email: string): Promise<void> {
        this.withUsers((users) => {
            delete users[email]
        })
    }
}
