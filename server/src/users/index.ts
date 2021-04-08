import { UserProfile } from "./UserProfile";
import { IdToken, UserId } from "../auth";

export type { UserProfile };

export abstract class UserService {
  abstract verifyIdToken(
    idToken: IdToken,
    checkIfRevoked?: boolean
  ): Promise<UserId>;

  abstract createProfile(idToken: IdToken, name: string): Promise<UserProfile>;

  abstract getProfile(idToken: IdToken): Promise<UserProfile | null>;
}
