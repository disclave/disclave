import {CreateProfileData, IUserRepository, UserProfileEntity, UserRecord} from "../../server/users/db";

export class UserRepositoryMock implements IUserRepository {
  // TODO update repository with mock logic

  async createProfile(userId: string, profile: CreateProfileData): Promise<string> {
    return Promise.resolve("");
  }

  async getUser(uid: string): Promise<UserRecord> {
    return Promise.resolve(undefined);
  }

  async getUserProfile(uid: string): Promise<UserProfileEntity> {
    return Promise.resolve(undefined);
  }

}