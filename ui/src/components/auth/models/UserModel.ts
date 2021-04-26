import { UserProfileModel } from "@/components/auth";

export interface UserModel {
  email: string;
  profile: UserProfileModel | null;
}
