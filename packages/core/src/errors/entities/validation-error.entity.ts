import { ValidationError } from 'yup'
import { ErrorEntity } from './error.entity'

export class ValidationErrorEntity extends ErrorEntity {
    constructor(public readonly error: ValidationError) {
        super(error.message)
    }
    httpCode: number = 400
}
