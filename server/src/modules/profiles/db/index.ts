import { ProfileEntity } from "./ProfileEntity";
import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";

export type { ProfileEntity };

export interface CreateProfileData {
  name: string;
}

export abstract class ProfileRepository<T = unknown> extends BaseRepository<T> {
  // abstract getUser(uid: string): Promise<UserRecord>;

  abstract existProfileByName(name: string, transaction?: T): Promise<boolean>;

  abstract createProfile(
    userId: UserId,
    profile: CreateProfileData,
    transaction?: T
  ): Promise<void>;

  abstract getProfile(
    uid: UserId,
    transation?: T
  ): Promise<ProfileEntity | null>;
}
