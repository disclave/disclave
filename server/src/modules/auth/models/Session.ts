import { UserProfile } from "@/modules/users";

export interface Session {
  user?: {
    email?: string | null;
  };
  profile?: UserProfile | null;
}
