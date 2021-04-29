import React from 'react';
import { UserSelfAvatar } from '@disclave/ui';
import { logout, ProfileModel } from '@disclave/client';

export interface AuthenticatedProps {
  userProfile: ProfileModel;
}

export const Authenticated: React.VFC<AuthenticatedProps> = ({ userProfile }) => {
  return <UserSelfAvatar userProfile={userProfile} onLogout={logout} left />;
};
