import React from 'react';
import { UserSelfAvatar } from '@disclave/ui';
import { Profile } from '@disclave/server';
import { logout } from '@/modules/auth';

export interface AuthenticatedProps {
  userProfile: Profile;
}

export const Authenticated: React.VFC<AuthenticatedProps> = ({ userProfile }) => {
  return <UserSelfAvatar userProfile={userProfile} onLogout={logout} left />;
};
