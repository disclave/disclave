import React from 'react';
import { UserSelfAvatar } from '@disclave/ui';
import { signOut } from 'next-auth/client';
import { Profile } from '@disclave/server';

export interface AuthenticatedProps {
  userProfile: Profile;
}

export const Authenticated: React.VFC<AuthenticatedProps> = ({ userProfile }) => {
  return <UserSelfAvatar userProfile={userProfile} onLogout={() => signOut()} left />;
};
