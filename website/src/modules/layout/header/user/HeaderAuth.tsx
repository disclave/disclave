import React from 'react';
import { Authenticated } from './Authenticated';
import { NotAuthenticated } from './NotAuthenticated';
import { useUserProfile } from '@/modules/auth';

export interface HeaderAuthProps {
  className?: string;
  loginHref?: string;
  registerHref?: string;
}

export const HeaderAuth: React.VFC<HeaderAuthProps> = ({ className, loginHref, registerHref }) => {
  const { user } = useUserProfile();

  return (
    <div className={className}>
      {user?.profile ? (
        <div className="w-max mr-0 ml-auto">
          <Authenticated userProfile={user.profile} />
        </div>
      ) : (
        <NotAuthenticated loginHref={loginHref} registerHref={registerHref} />
      )}
    </div>
  );
};
