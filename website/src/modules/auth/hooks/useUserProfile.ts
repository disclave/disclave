import { useSession } from 'next-auth/client';
import { Session, UserProfile } from '@disclave/server';

export type UseUserProfile = {
  session: Session | null;
  profile: UserProfile | null;
};

export const useUserProfile = (): UseUserProfile => {
  const [session] = useSession();

  // TODO: fix casting
  return {
    session: session as any,
    profile: session?.profile as any
  };
};
