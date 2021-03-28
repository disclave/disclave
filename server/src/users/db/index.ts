import { UserRecord } from "../../firebase";
import { UserProfileEntity } from "./UserProfileEntity";
import { BaseRepository } from "../../repository";

export type { UserRecord, UserProfileEntity };

export interface CreateProfileData {
  name: string;
}

export abstract class UserRepository<T = unknown> extends BaseRepository<T> {
  abstract getUser(uid: string): Promise<UserRecord>;

  abstract existProfileByName(name: string, transaction?: T): Promise<boolean>;

  abstract createProfile(
    userId: string,
    profile: CreateProfileData,
    transaction?: T
  ): Promise<void>;

  abstract getUserProfile(uid: string, transation?: T): Promise<UserProfileEntity | null>;
}
