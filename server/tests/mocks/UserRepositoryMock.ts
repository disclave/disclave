import {
  CreateProfileData,
  UserRepository,
  UserProfileEntity,
  UserRecord,
} from "../../src/users/db";
import { injectable } from "inversify";

@injectable()
export class UserRepositoryMock implements UserRepository<{}> {
  // TODO update repository with mock logic

  existProfileByName(name: string, transaction?: {}): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  runTransaction(run: (t: {}) => Promise<unknown>): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async createProfile(
    userId: string,
    profile: CreateProfileData
  ): Promise<void> {
    return;
  }

  async getUser(uid: string): Promise<UserRecord> {
    return Promise.resolve(undefined);
  }

  async getUserProfile(uid: string): Promise<UserProfileEntity> {
    return Promise.resolve(undefined);
  }
}
