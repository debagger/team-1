import { Either } from '@sweet-monads/either'
import { ErrorEntity } from '../domain'

export interface IControllerContext {
    email: string | null
    isAuthenticated: boolean
}

export interface IControllerMethodInput<D> {
    context: IControllerContext
    data: D
}

export type ControllerMethodOutput<O> = Promise<Either<ErrorEntity, O>>

export type ControllerMetodType<D, O> = (
    input: IControllerMethodInput<D>
) => ControllerMethodOutput<O>

export type ControllerType<ClassType> = {
    [K in keyof ClassType]: ClassType[K] extends ControllerMetodType<
        infer D,
        infer R
    >
        ? ControllerMetodType<D, R> extends ClassType[K]
            ? ControllerMetodType<D, R>
            : 'Неправильный тип метода контроллера'
        : 'Неправильный тип метода контроллера'
}

export type ApiMethod<M> = M extends ControllerMetodType<infer D, infer O>
    ? (data: D) => ControllerMethodOutput<O>
    : never

export type ClientApiType<ApiClass> = ApiClass extends ControllerType<
    infer ClassType
>
    ? { [K in keyof ClassType]: ApiMethod<ClassType[K]> }
    : never
