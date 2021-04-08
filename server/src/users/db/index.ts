import { UserRecord } from "../../firebase";
import { UserProfileEntity } from "./UserProfileEntity";
import { BaseRepository } from "../../repository";
import { UserId } from "../../auth";

export type { UserRecord, UserProfileEntity };

export interface CreateProfileData {
  name: string;
}

export abstract class UserRepository<T = unknown> extends BaseRepository<T> {
  abstract getUser(uid: UserId): Promise<UserRecord>;

  abstract existProfileByName(name: string, transaction?: T): Promise<boolean>;

  abstract createProfile(
    userId: UserId,
    profile: CreateProfileData,
    transaction?: T
  ): Promise<void>;

  abstract getUserProfile(
    uid: UserId,
    transation?: T
  ): Promise<UserProfileEntity | null>;
}
