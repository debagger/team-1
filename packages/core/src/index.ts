import { AuthController } from './domain/auth/AuthController'
import { AuthService } from './domain/auth/AuthService'
import { IUserApi } from './domain/user/IUserApi'
import { UserController } from './domain/user/UserController'
import { UserService } from './domain/user/UserService'
import { IApi } from './IApi'
import { IPorts } from './IPorts'

export function getCoreApi(ports: IPorts): IApi {
    const userService = new UserService(ports.users)
    const users: IUserApi = new UserController(userService)
    const authService = new AuthService(ports.auth, userService)
    const auth = new AuthController(authService)
    const api: IApi = { users, auth }
    return api
}

export { IApi } from './IApi'
export { IPorts } from './IPorts'
export * from './domain'
export { Either, left, right } from '@sweet-monads/either'
