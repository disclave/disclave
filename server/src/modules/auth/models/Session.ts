import { UserProfile } from "@/modules/users";
import { UserId } from "@/modules/auth";

export interface Session {
  uid: UserId;
  user: {
    email: string;
  };
  profile: UserProfile | null;
}
