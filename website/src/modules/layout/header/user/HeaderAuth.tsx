import React from 'react';
import { useSession } from '@disclave/client';
import { Authenticated } from './Authenticated';
import { NotAuthenticated } from './NotAuthenticated';

export interface HeaderAuthProps {
  className?: string;
  loginHref?: string;
  registerHref?: string;
}

export const HeaderAuth: React.VFC<HeaderAuthProps> = ({ className, loginHref, registerHref }) => {
  const { profile } = useSession();

  return (
    <div className={className}>
      {profile ? (
        <div className="w-max mr-0 ml-auto">
          <Authenticated userProfile={profile} />
        </div>
      ) : (
        <NotAuthenticated loginHref={loginHref} registerHref={registerHref} />
      )}
    </div>
  );
};
