import { UserProfileModel } from "@/components/auth";

export interface UserModel {
  uid: string;
  email: string;
  emailVerified: boolean;
  profile: UserProfileModel | null;
}
