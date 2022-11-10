import { ErrorEntity } from './error.entity'

export class InternalErrorEntity extends ErrorEntity {
    constructor(public error: Error) {
        super(error.message)
    }
    httpCode: number = 500
}
