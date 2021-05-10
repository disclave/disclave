import {
  CreateProfileData,
  ProfileRepository,
  ProfileEntity
} from "../../src/modules/profiles/db";
import { injectable } from "inversify";

@injectable()
export class ProfileRepositoryMock implements ProfileRepository<{}> {

  public static db = new Map<string,   ProfileEntity>();

  public static deleteAll() {
    this.db.clear();
  }

  async runTransaction(run: (t: {}) => Promise<unknown>): Promise<void> {
    await run({});
  }

  async existProfileByName(name: string, transaction?: {}): Promise<boolean> {
    for (let value of ProfileRepositoryMock.db.values()) {
      if (value.name.toLowerCase() == name.toLowerCase()) return true;
    }

    return false;
  }

  async createProfile(
    userId: string,
    profile: CreateProfileData
  ): Promise<void> {
    ProfileRepositoryMock.db.set(userId, {
      uid: userId,
      name: profile.name,
    });
  }

  async getProfile(uid: string): Promise<ProfileEntity | null> {
    return ProfileRepositoryMock.db.get(uid);
  }
}
