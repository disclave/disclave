import { UserProfileModel } from "@/components/auth";

export interface UserModel {
  email: string;
  emailVerified: boolean;
  profile: UserProfileModel | null;
}
