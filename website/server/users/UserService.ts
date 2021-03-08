import {auth} from "../firebase";
import {UserProfile} from "./UserProfile";
import {IUserService} from "./index";
import {IUserRepository, UserProfileEntity, userRepositoryPort} from "./db";

export class UserService implements IUserService {

  private repository: IUserRepository

  public constructor() {
    this.repository = userRepositoryPort.get()
  }

  public async verifyIdToken(idToken: string, checkIfRevoked: boolean = false): Promise<string> {
    const token = await auth.verifyIdToken(idToken, checkIfRevoked)
    return token.uid
  }

  public async createProfile(idToken: string, name: string): Promise<string> {
    const uid = await this.verifyIdToken(idToken)

    const user = await this.repository.getUser(uid)
    // TODO: is this check required? can user with disabled account generate the idToken?
    if (user.disabled)
      throw 'User account is disabled'

    return await this.repository.createProfile(uid, {
      name: name
    })
  }

  public async getProfile(idToken: string): Promise<UserProfile> {
    const uid = await this.verifyIdToken(idToken)
    const profile = await this.repository.getUserProfile(uid)
    return toDomain(profile)
  }
}

const toDomain = (entity: UserProfileEntity): UserProfile => {
  return {
    id: entity.id,
    name: entity.name
  }
}