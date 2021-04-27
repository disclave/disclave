import { UserProfileEntity } from "./UserProfileEntity";
import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";

export type { UserProfileEntity };

export interface CreateProfileData {
  name: string;
}

export abstract class UserRepository<T = unknown> extends BaseRepository<T> {
  // abstract getUser(uid: string): Promise<UserRecord>;

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
