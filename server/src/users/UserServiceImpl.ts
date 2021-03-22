import { UserProfile } from "./UserProfile";
import { UserService } from "./index";
import { UserRepository, UserProfileEntity } from "./db";
import { inject, injectable } from "inversify";
import { AuthProvider } from "../auth";

@injectable()
export class UserServiceImpl implements UserService {
  @inject(AuthProvider)
  private auth: AuthProvider;

  @inject(UserRepository)
  private repository: UserRepository;

  public async verifyIdToken(
    idToken: string,
    checkIfRevoked: boolean = false
  ): Promise<string> {
    const token = await this.auth.verifyIdToken(idToken, checkIfRevoked);
    return token.uid;
  }

  public async createProfile(
    idToken: string,
    name: string
  ): Promise<UserProfile> {
    const uid = await this.verifyIdToken(idToken);

    const user = await this.repository.getUser(uid);
    // TODO: is this check required? can user with disabled account generate the idToken?
    if (user.disabled) throw "User account is disabled";

    // TODO: verify if user name is unique and contains only allowed character
    return await this.repository.createProfile(uid, {
      name: name,
    });
  }

  public async getProfile(idToken: string): Promise<UserProfile | null> {
    const uid = await this.verifyIdToken(idToken);
    const profile = await this.repository.getUserProfile(uid);
    return toDomain(profile);
  }
}

const toDomain = (entity: UserProfileEntity): UserProfile => {
  return {
    id: entity.id,
    name: entity.name,
  };
};
