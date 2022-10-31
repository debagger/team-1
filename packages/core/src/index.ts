import { AuthController } from './domain/auth/AuthController'
import { AuthService } from './domain/auth/AuthService'
import { UserController } from './domain/user/UserController'
import { UserService } from './domain/user/UserService'
import { ClientApiType, ControllerType } from './IController'
import { IPorts } from './IPorts'

export function getCoreApi(ports: IPorts) {
    const userService = new UserService(ports.users)
    const authService = new AuthService(ports.auth, userService)

    const users = new UserController(userService)
    const auth = new AuthController(authService)

    return { users, auth }
}

type CoreApiType = ReturnType<typeof getCoreApi>

export type ICoreApi = {
    [K in keyof CoreApiType]: ControllerType<CoreApiType[K]>
}

export type ICoreClientApi = {
    [K in keyof ICoreApi]: ClientApiType<ICoreApi[K]>
}

export { IControllerMethodInput } from './IController'

export { Either, left, right } from '@sweet-monads/either'

export * from './domain'

export { IPorts } from './IPorts'
