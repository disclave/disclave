import { useContext } from 'react';
import { AuthCtx } from '@/modules/auth/provider/AuthCtx';
import { Session } from '@disclave/server';

export type UseAuth = {
  session?: Session | null;
};

export const useAuth = (): UseAuth => {
  const { session } = useContext(AuthCtx);

  return {
    session
  };
};
