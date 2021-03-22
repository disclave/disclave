import { UserRecord } from "../../firebase";
import { UserProfileEntity } from "./UserProfileEntity";

export type { UserRecord, UserProfileEntity };

export interface CreateProfileData {
  name: string;
}

export abstract class UserRepository {
  abstract getUser(uid: string): Promise<UserRecord>;

  abstract createProfile(
    userId: string,
    profile: CreateProfileData
  ): Promise<UserProfileEntity>;

  abstract getUserProfile(uid: string): Promise<UserProfileEntity | null>;
}
