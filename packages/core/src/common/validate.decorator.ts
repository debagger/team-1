import { left } from '@sweet-monads/either'
import { BaseSchema, InferType, ValidationError } from 'yup'
import { ErrorEntity } from '../domain'
import { ValidationErrorEntity } from '../errors/entities/validation-error.entity'
import { ControllerMetodType, ControllerType, Input } from './controller.types'

export const ValidateControllerInput = <DT extends BaseSchema>(schema: DT) => {
    return <T extends ControllerType<T>, PKey extends keyof T>(
        target: T,
        propertyKey: PKey,
        descriptor: TypedPropertyDescriptor<
            ControllerMetodType<unknown, unknown>
        >
    ) => {
        const original = descriptor.value
        descriptor.value = function (input: Input<InferType<DT>>) {
            if (input?.data) {
                try {
                    const data = schema.validateSync(input.data, {
                        stripUnknown: true,
                    })
                    return original.bind(this)({ ...input, data })
                } catch (error) {
                    if (error instanceof ValidationError) {
                        return left(new ValidationErrorEntity(error))
                    }
                    throw error
                }
            }
        }
    }
}
