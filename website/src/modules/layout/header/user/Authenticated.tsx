import React from 'react';
import { UserProfileModel } from '@/modules/auth';

export interface AuthenticatedProps {
  userProfile: UserProfileModel;
}

export const Authenticated: React.VFC<AuthenticatedProps> = ({ userProfile }) => {
  // const {
  //   actions: { logout }
  // } = useSession();

  return <div>{JSON.stringify(userProfile)}</div>;

  // TODO: fixme
  // return <UserSelfAvatar userProfile={userProfile} onLogout={logout} left />;
};
