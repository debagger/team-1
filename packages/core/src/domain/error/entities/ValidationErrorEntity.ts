import { ValidationError } from 'yup'
import { ErrorEntity } from './ErrorEntity'

export class ValidationErrorEntity extends ErrorEntity {
    constructor(public error: ValidationError) {
        super(error.message)
    }
}
