import { ProfileService, Profile } from "@/modules/profiles";
import { injectable } from "inversify";
import { asUserId } from "@/modules/auth";

@injectable()
export class ProfileServiceMock implements ProfileService {
  public static defaultUserProfile: Profile = {
    uid: asUserId("mock-user-id"),
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
