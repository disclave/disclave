import { Session, Profile } from '@disclave/server';
import { useAuth } from '@/modules/auth/provider';

export type UseUserProfile = {
  session: Session | null;
  profile: Profile | null;
};

export const useUserProfile = (): UseUserProfile => {
  const { session } = useAuth();

  return {
    session: session,
    profile: session?.profile
  };
};
