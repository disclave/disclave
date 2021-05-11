import {
  CreateProfileData,
  ProfileRepository,
  ProfileEntity
} from "@/modules/profiles/db";
import { injectable } from "inversify";
import { UserId } from "@/modules/auth";

@injectable()
export class ProfileRepositoryMock implements ProfileRepository<{}> {

  public static db = new Map<UserId,   ProfileEntity>();

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
    userId: UserId,
    profile: CreateProfileData
  ): Promise<void> {
    ProfileRepositoryMock.db.set(userId, {
      uid: userId,
      name: profile.name,
    });
  }

  async getProfile(uid: UserId): Promise<ProfileEntity | null> {
    return ProfileRepositoryMock.db.get(uid);
  }
}
