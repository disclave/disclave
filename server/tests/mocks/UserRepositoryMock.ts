import {
  CreateProfileData,
  UserRepository,
  UserProfileEntity,
  UserRecord,
} from "../../src/users/db";
import { injectable } from "inversify";

@injectable()
export class UserRepositoryMock implements UserRepository<{}> {
  public static db = new Map<string, UserProfileEntity>();

  public static deleteAll() {
    this.db.clear();
  }

  async existProfileByName(name: string, transaction?: {}): Promise<boolean> {
    for (let value of UserRepositoryMock.db.values()) {
      if (value.name.toLowerCase() == name.toLowerCase()) return true;
    }

    return false;
  }

  async runTransaction(run: (t: {}) => Promise<unknown>): Promise<void> {
    await run({});
  }

  async createProfile(
    userId: string,
    profile: CreateProfileData
  ): Promise<void> {
    UserRepositoryMock.db.set(userId, {
      id: userId,
      name: profile.name,
    });
  }

  async getUser(uid: string): Promise<UserRecord> {
    return {
      uid: uid,
      disabled: false,
    } as UserRecord;
  }

  async getUserProfile(uid: string): Promise<UserProfileEntity | null> {
    return UserRepositoryMock.db.get(uid);
  }
}
