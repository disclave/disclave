import {IUserService, UserProfile} from "../../server/users";

export class UserServiceMock implements IUserService {

  public static defaultUserProfile: UserProfile = {
    id: 'mock-user-id',
    name: 'mock_user_name'
  }

  async createProfile(idToken: string, name: string): Promise<string> {
    return UserServiceMock.defaultUserProfile.id
  }

  async getProfile(idToken: string): Promise<UserProfile> {
    return UserServiceMock.defaultUserProfile
  }

  async verifyIdToken(idToken: string, checkIfRevoked: boolean): Promise<string> {
    return UserServiceMock.defaultUserProfile.id
  }

}