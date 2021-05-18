import { Profile } from "./Profile";
import { UserId } from "@/modules/auth";

export type { Profile };

export abstract class ProfileService {
  abstract createProfile(uid: UserId, name: string): Promise<Profile>;

  abstract getProfile(uid: UserId): Promise<Profile | null>;
}
