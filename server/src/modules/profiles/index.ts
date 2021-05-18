import { Profile } from "./Profile";
import { IdToken, UserId } from "@/modules/auth";

export type { Profile };

export abstract class ProfileService {
  abstract createProfile(idToken: IdToken, name: string): Promise<Profile>;

  abstract getProfile(uid: UserId): Promise<Profile | null>;
}
