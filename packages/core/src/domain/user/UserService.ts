import { IUserPort } from './IUserPort'

export class UserService {
    constructor(private readonly port: IUserPort) {}
}
