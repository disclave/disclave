import { UserProfileModel } from "./UserProfileModel";

export interface SessionModel {
  uid: string;
  email: string;
  emailVerified: boolean;
  profile: UserProfileModel | null;
}
