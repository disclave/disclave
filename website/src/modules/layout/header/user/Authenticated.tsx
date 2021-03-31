import React from 'react';
import { logout, UserProfileModel } from '@disclave/client';
import { UserSelfAvatar } from '@disclave/ui';

export interface AuthenticatedProps {
  userProfile: UserProfileModel;
}

export const Authenticated: React.VFC<AuthenticatedProps> = ({ userProfile }) => {
  return <UserSelfAvatar userProfile={userProfile} onLogout={logout} left />;
};
