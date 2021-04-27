import React from 'react';
import { Authenticated } from './Authenticated';
import { NotAuthenticated } from './NotAuthenticated';
import { useUserProfile } from '@/modules/auth';

export interface HeaderAuthProps {
  className?: string;
  loginHref?: string;
}

export const HeaderAuth: React.VFC<HeaderAuthProps> = ({ className, loginHref }) => {
  const { profile } = useUserProfile();

  return (
    <div className={className}>
      {profile ? (
        <div className="w-max mr-0 ml-auto">
          <Authenticated userProfile={profile} />
        </div>
      ) : (
        <NotAuthenticated loginHref={loginHref} />
      )}
    </div>
  );
};
