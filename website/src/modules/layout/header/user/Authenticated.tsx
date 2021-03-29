import React from 'react';
import { UserProfileModel } from '@disclave/client';

export interface AuthenticatedProps {
  userProfile: UserProfileModel;
}

export const Authenticated: React.VFC<AuthenticatedProps> = ({ userProfile }) => {
  return <div>{userProfile.name}</div>;
};
