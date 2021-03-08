import {CreateProfileData, UserRepository, UserProfileEntity, UserRecord} from "../../server/users/db";
import {injectable} from "inversify";

@injectable()
export class UserRepositoryMock implements UserRepository {
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