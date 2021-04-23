import React from 'react';
import { UserProfileModel } from '@/modules/auth';
import { UserSelfAvatar } from '@disclave/ui';
import { signOut } from 'next-auth/client';

export interface AuthenticatedProps {
  userProfile: any; // TODO: fixme
}

export const Authenticated: React.VFC<AuthenticatedProps> = ({ userProfile }) => {
  // const {
  //   actions: { logout }
  // } = useSession();

  // return <div>{JSON.stringify(userProfile)}</div>;

  // TODO: fixme
  return <UserSelfAvatar userProfile={userProfile} onLogout={() => signOut()} left />;
};
