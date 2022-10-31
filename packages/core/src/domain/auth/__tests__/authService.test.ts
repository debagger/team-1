import { right } from '@sweet-monads/either'
import { IUser } from '../../user/IUser'
import { UserService } from '../../user/UserService'
import { makeUserServiceMock } from '../../user/__tests__/UserService.test'
import { AuthService } from '../AuthService'
import md5 from 'md5'

describe('AuthService', () => {
    let userServiceMock: {
        users: Map<string, IUser>
        userService: UserService
    }

    let authServiceMock: {
        tokens: Map<string, string>
        passwordHashes: Map<string, string>
        authService: AuthService
    }

    beforeEach(() => {
        userServiceMock = makeUserServiceMock()
        authServiceMock = makeAuthServiceMock(userServiceMock.userService)
    })

    test('register', async () => {
        const { authService, passwordHashes } = authServiceMock
        const userData: IUser = {
            email: 'testmail',
            firstName: 'fn',
            lastName: 'ln',
            avatar: '/logo192.png'
        }
        const response = await authService.register(userData, 'password')

        expect(response.isRight()).toBe(true)
        expect(response.value).toEqual(userData)

        const [key, value] = [...passwordHashes.entries()][0]

        expect(key).toEqual(userData.email)
        expect(value).toEqual(md5('password'))
    })
})

export function makeAuthServiceMock(userService: UserService) {
    const tokens: Map<string, string> = new Map()
    const passwordHashes: Map<string, string> = new Map()
    const authService = new AuthService(
        {
            async addUserToken(userEmail, token) {
                tokens.set(token, userEmail)
                return right(undefined)
            },
            async getUserEmailByToken(token) {
                const email = tokens.get(token)
                return right({ email })
            },
            async getUserPasswordHash(email) {
                return right(passwordHashes.get(email))
            },
            async setUserPasswordHash({ email, hash }) {
                passwordHashes.set(email, hash)
                return right(undefined)
            },
        },
        userService
    )

    return { tokens, passwordHashes, authService }
}
