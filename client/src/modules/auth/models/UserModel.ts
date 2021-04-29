import { ProfileModel } from "./ProfileModel";

export type UserId = string & { readonly type: unique symbol };
export const asUserId = (value: string) => value as UserId;

export interface UserModel {
  uid: UserId;
  email: string;
  emailVerified: boolean;
  profile: ProfileModel | null;
}
