import React from 'react';
import { UserProfileModel, useSession } from '@disclave/client';
import { UserSelfAvatar } from '@disclave/ui';

export interface AuthenticatedProps {
  userProfile: UserProfileModel;
}

export const Authenticated: React.VFC<AuthenticatedProps> = ({ userProfile }) => {
  const {
    actions: { logout }
  } = useSession();

  return <UserSelfAvatar userProfile={userProfile} onLogout={logout} left />;
};
