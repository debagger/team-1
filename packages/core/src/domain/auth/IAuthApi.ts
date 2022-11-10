import { ClientApiType, ControllerType } from '../../common/controller.types'
import { IUser } from '../user/IUser'
import { AuthController } from './auth.controller'

export interface IRegisterUserInput extends IUser {
    password: string
}

export interface ILoginOutput {
    token: string
}

export type IAuthApi = ClientApiType<ControllerType<AuthController>>
