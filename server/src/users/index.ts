import { UserProfile } from "./UserProfile";

export type { UserProfile };

export abstract class UserService {
  abstract verifyIdToken(
    idToken: string,
    checkIfRevoked?: boolean
  ): Promise<string>;

  abstract createProfile(idToken: string, name: string): Promise<UserProfile>;

  abstract getProfile(idToken: string): Promise<UserProfile>;
}
