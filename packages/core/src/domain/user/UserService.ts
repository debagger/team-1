import { Either, left, right } from '@sweet-monads/either'
import { ErrorEntity } from '../error/entities/ErrorEntity'
import { IUser } from './IUser'
import { IUserPort, UpdateUserData } from './IUserPort'

export class UserService {
    constructor(private readonly port: IUserPort) {}

    async getUserByEmail(email: string) {
        return this.port.getUserByEmail(email)
    }

    async createUser(newUser: IUser): Promise<Either<ErrorEntity, IUser>> {
        const user = await this.getUserByEmail(newUser.email)
        if (user) return left(new ErrorEntity('Пользователь уже существует'))
        const result = await this.port.create(newUser)
        return right(result)
    }

    async updateUser(email: string, newData: UpdateUserData): Promise<Either<ErrorEntity, IUser>> {
        const user = await this.getUserByEmail(email)
        if (!user) return left(new ErrorEntity('Пользователь не существует'))
        const result = await this.port.update(email, newData)
        return right(result)
    }
}
