import { ClientApiType, ControllerType } from '../../IController'
import { IUser } from '../user/IUser'
import { AuthController } from './auth.controller'

export interface IRegisterUserInput extends IUser {
    password: string
}

export interface ILoginOutput {
    token: string
}

export type IAuthApi = ClientApiType<ControllerType<AuthController>>
