import { Either, left, right } from '@sweet-monads/either'
import { ErrorEntity } from '../error/entities/ErrorEntity'
import { IUser } from '../user/IUser'
import { UserService } from '../user/UserService'
import { IAuthPort } from './IAuthPort'
import md5 from 'md5'
import { ILoginOutput } from './IAuthApi'

export class AuthService {
    constructor(
        private readonly authPort: IAuthPort,
        private readonly userService: UserService
    ) {}

    async register(
        inputUserData: IUser,
        password: string
    ): Promise<Either<ErrorEntity, IUser>> {
        const user = await this.userService.createUser(inputUserData)
        if (user instanceof ErrorEntity) return left(user)
        const hash = md5(password) as string

        this.authPort.setUserPasswordHash({ email: inputUserData.email, hash })
        return user
    }

    async login(
        email: string,
        password: string
    ): Promise<Either<ErrorEntity, ILoginOutput>> {
        const inputHash = md5(password)
        const userHash = (await this.authPort.getUserPasswordHash(email)).value
        console.log({ inputHash, userHash })
        if (inputHash !== userHash)
            return left(
                new ErrorEntity(
                    'Такого пользователя не существует или неправльный пароль'
                )
            )
        const token = md5(email + password + Date.now)
        const addTokenResult = (await this.authPort.addUserToken(email, token))
            .value
        if (addTokenResult instanceof ErrorEntity) return left(addTokenResult)
        return right({ token })
    }
}
