import { UserProfile } from "./UserProfile";

export type { UserProfile };

export abstract class UserService {
  abstract createProfile(uid: string, name: string): Promise<UserProfile>;

  abstract getProfile(uid: string): Promise<UserProfile | null>;
}
