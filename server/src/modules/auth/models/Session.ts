import { Profile } from "@/modules/profiles";
import { UserId } from "@/modules/auth";

export interface Session {
  uid: UserId;
  user: {
    email: string;
  };
  profile: Profile | null;
}
