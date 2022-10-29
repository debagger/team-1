import {
  ErrorEntity,
  IGetUserEmailByTokenOutput,
  IPorts,
  ISetUserPasswordHashInput,
  IUser,
  UpdateUserData,
  Either,
  right,
} from "core";

type IAuthPort = IPorts["auth"];
type IUserPort = IPorts["users"];

export class DemoPort implements IPorts {
  users = new UserPort();
  auth = new AuthPort();
}

function withLocalStorage<Item>(name: string) {
  return function <T>(cb: (users: { [key: string]: Item }) => T): T {
    const value = localStorage.getItem(name);

    const users: { [key: string]: Item } = value
      ? (JSON.parse(value) as any)
      : {};

    const result = cb(users);

    localStorage.setItem(name, JSON.stringify(users, undefined, 2));
    return result;
  };
}
class UserPort implements IUserPort {
  private withUsers = withLocalStorage<IUser>("users");

  async getUserByEmail(email: string): Promise<IUser> {
    return this.withUsers((users) => users[email]);
  }
  async create(user: IUser): Promise<IUser> {
    const { email } = user;
    return this.withUsers((users) => {
      users[email] = { ...user };
      return this.getUserByEmail(email);
    });
  }
  update(email: string, data: UpdateUserData): Promise<IUser> {
    return this.withUsers((users) => {
      users[email] = { email, ...data };
      return this.getUserByEmail(email);
    });
  }
  async delete(email: string): Promise<void> {
    this.withUsers((users) => {
      delete users[email];
    });
  }
}

class AuthPort implements IAuthPort {
  private withHashes = withLocalStorage<{ email: string; hash: string }>(
    "password_hashes"
  );

  private withTokens = withLocalStorage<{ email: string; token: string }>(
    "tokens"
  );

  async getUserPasswordHash(
    email: string
  ): Promise<Either<ErrorEntity, string>> {
    return this.withHashes((hashes) => {
      return right(hashes[email].hash);
    });
  }

  async setUserPasswordHash(
    data: ISetUserPasswordHashInput
  ): Promise<Either<ErrorEntity, void>> {
    return this.withHashes((hashes) => {
      hashes[data.email] = data;
      return right(undefined);
    });
  }
  async getUserEmailByToken(
    token: string
  ): Promise<Either<ErrorEntity, IGetUserEmailByTokenOutput>> {
    return this.withTokens((tokens) => {
      return right(tokens[token]);
    });
  }
  async addUserToken(
    userEmail: string,
    token: string
  ): Promise<Either<ErrorEntity, void>> {
    return this.withTokens((tokens) => {
      tokens[token] = { email: userEmail, token };
      return right(undefined);
    });
  }
}
