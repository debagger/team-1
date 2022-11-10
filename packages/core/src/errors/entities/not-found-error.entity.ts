import { ErrorEntity } from './error.entity'

export class NotFoundErrorEntity extends ErrorEntity {
    constructor(public readonly message) {
        super(message)
    }
    readonly httpCode: number = 404
}
