import { UserService, UserProfile } from "../../src/users";
import { injectable } from "inversify";

@injectable()
export class UserServiceMock implements UserService {
  public static defaultUserProfile: UserProfile = {
    id: "mock-user-id",
    name: "mock_user_name",
  };

  async createProfile(idToken: string, name: string): Promise<UserProfile> {
    return UserServiceMock.defaultUserProfile;
  }

  async getProfile(idToken: string): Promise<UserProfile> {
    return UserServiceMock.defaultUserProfile;
  }

  async verifyIdToken(
    idToken: string,
    checkIfRevoked: boolean
  ): Promise<string> {
    return UserServiceMock.defaultUserProfile.id;
  }
}
