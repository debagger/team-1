import { IUser } from '../IUser'
import { UserService } from '../UserService'

describe('UserService', () => {
    let users: Map<string, IUser>
    let userService: UserService
    beforeEach(() => {
        const { userService: s, users: u } = makeUserServiceMock()
        users = u
        userService = s
    })

    test('cant create user with same email twice', async () => {
        const user: IUser = {
            email: 'testmail',
            firstName: 'fn',
            lastName: 'ln',
        }

        await userService.createUser(user)

        const result_err = await userService.createUser(user)
        expect(result_err.isLeft()).toBe(true)
        expect(
            result_err.mapLeft((err) =>
                expect(err.message).toEqual('Пользователь уже существует')
            )
        )
    })
})

export function makeUserServiceMock() {
    const users: Map<string, IUser> = new Map()
    const userService = new UserService({
        async create(user: IUser) {
            users.set(user.email, { ...user })
            return { ...user }
        },
        async getUserByEmail(email) {
            return users.get(email)
        },
    } as any)

    return { users, userService }
}
