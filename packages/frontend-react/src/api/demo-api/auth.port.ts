import { ErrorEntity, IGetUserEmailByTokenOutput, ISetUserPasswordHashInput, Either, right } from 'core'
import { IAuthPort } from './demo.port'
import { withLocalStorage } from './with-local-storage.helper'

export class AuthPort implements IAuthPort {
    private withHashes = withLocalStorage<{ email: string; hash: string }>('password_hashes')

    private withTokens = withLocalStorage<{ email: string; token: string }>('tokens')

    async getUserPasswordHash(email: string): Promise<Either<ErrorEntity, string>> {
        return this.withHashes((hashes) => {
            return right(hashes[email].hash)
        })
    }

    async setUserPasswordHash(data: ISetUserPasswordHashInput): Promise<Either<ErrorEntity, void>> {
        return this.withHashes((hashes) => {
            hashes[data.email] = data
            return right(undefined)
        })
    }
    async getUserEmailByToken(token: string): Promise<Either<ErrorEntity, IGetUserEmailByTokenOutput>> {
        return this.withTokens((tokens) => {
            return right(tokens[token])
        })
    }
    async addUserToken(userEmail: string, token: string): Promise<Either<ErrorEntity, void>> {
        return this.withTokens((tokens) => {
            tokens[token] = { email: userEmail, token }
            return right(undefined)
        })
    }
}
