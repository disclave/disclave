import { UserProfile } from "@/modules/users";

export interface Session {
  uid: string;
  user: {
    email: string;
  };
  profile: UserProfile | null;
}
