import { UserProfile } from "@/modules/users";

export interface Session {
  uid: string;
  email: string;
  emailVerified: boolean;
  profile: UserProfile | null;
}
