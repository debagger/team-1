import { Either } from '@sweet-monads/either'
import { ErrorEntity } from './domain'

export interface IControllerContext {
    token: string | null
}

export type IControllerMethodInput<D> = {
    context: IControllerContext
    data: D
}

export type IControllerMethodOutput<O> = Promise<Either<ErrorEntity, O>>

export type ControllerMetodType<D, O> = (
    input: IControllerMethodInput<D>
) => IControllerMethodOutput<O>

export type ControllerType<ClassType> = {
    [K in keyof ClassType]: ClassType[K] extends ControllerMetodType<
        infer D,
        infer R
    >
        ? ControllerMetodType<D, R>
        : never
}

export type ApiMethod<M> = M extends ControllerMetodType<infer D, infer O>
    ? (data: D) => IControllerMethodOutput<O>
    : never

export type ClientApiType<ApiClass> = ApiClass extends ControllerType<
    infer ClassType
>
    ? { [K in keyof ClassType]: ApiMethod<ClassType[K]> }
    : never
