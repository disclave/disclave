import {UserRepository} from "./db/UserRepository"

const repository = new UserRepository()

export class UserService {
  public async createProfile(userId: string, name: string): Promise<string> {
    const user = await repository.getUser(userId)
    if (user.disabled)
      throw 'User account is disabled'

    return await repository.createProfile(userId, {
      name: name
    })
  }
}