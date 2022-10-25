export type UserId = number
export type UserLoginName = string
export type UserEmail = string
export type UserPhone = string

export interface IUser {
    id: UserId
    loginName: UserLoginName
    email: UserEmail
    phone: UserPhone
}
