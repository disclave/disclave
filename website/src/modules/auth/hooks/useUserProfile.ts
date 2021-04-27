import { useSession } from 'next-auth/client';
import { Session, Profile } from '@disclave/server';

export type UseUserProfile = {
  session: Session | null;
  profile: Profile | null;
};

export const useUserProfile = (): UseUserProfile => {
  const [session] = useSession();

  // TODO: fix casting
  return {
    session: session as any,
    profile: session?.profile as any
  };
};
