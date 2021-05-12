import React from 'react';
import { UserSelfAvatar } from '@disclave/ui';
import { ProfileModel } from '@disclave/client';

export interface AuthenticatedProps {
  userProfile: ProfileModel;
  onLogout: () => Promise<void>;
}

export const Authenticated: React.VFC<AuthenticatedProps> = ({ userProfile, onLogout }) => {
  return <UserSelfAvatar userProfile={userProfile} onLogout={onLogout} left />;
};
