import { UserProfileModel } from "../../users";

export interface SessionModel {
  uid: string;
  email: string;
  emailVerified: boolean;
  profile: UserProfileModel | null;
}
