import React from 'react';
// import { UserProfileModel, useSession } from '@disclave/client';
// import { UserSelfAvatar } from '@disclave/ui';
import { UserProfile } from '@auth0/nextjs-auth0';

export interface AuthenticatedProps {
  userProfile: UserProfile;
}

export const Authenticated: React.VFC<AuthenticatedProps> = ({ userProfile }) => {
  // const {
  //   actions: { logout }
  // } = useSession();

  return <div>{JSON.stringify(userProfile)}</div>;

  // return <UserSelfAvatar userProfile={userProfile} onLogout={logout} left />;
};
