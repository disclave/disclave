import { UserProfile } from "./UserProfile";
import { UserId } from "@/modules/auth";

export type { UserProfile };

export abstract class UserService {
  abstract createProfile(uid: UserId, name: string): Promise<UserProfile>;

  abstract getProfile(uid: UserId): Promise<UserProfile | null>;
}
