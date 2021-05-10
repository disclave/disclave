import { ProfileService, Profile } from "../../src/modules/profiles";
import { injectable } from "inversify";

@injectable()
export class ProfileServiceMock implements ProfileService {
  public static defaultUserProfile: Profile = {
    uid: "mock-user-id",
    name: "mock_user_name",
  };

  async createProfile(idToken: string, name: string): Promise<Profile> {
    return ProfileServiceMock.defaultUserProfile;
  }

  async getProfile(idToken: string): Promise<Profile> {
    return ProfileServiceMock.defaultUserProfile;
  }

  async verifyIdToken(
    idToken: string,
    checkIfRevoked: boolean
  ): Promise<string> {
    return ProfileServiceMock.defaultUserProfile.uid;
  }
}
