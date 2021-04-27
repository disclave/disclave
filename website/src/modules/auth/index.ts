import { signOut } from 'next-auth/client';

export { useUserProfile } from './hooks';

export const logout = async () => {
  await signOut({ redirect: false });
};
