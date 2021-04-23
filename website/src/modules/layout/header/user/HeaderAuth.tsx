import React from 'react';
// import { useSession } from '@disclave/client';
import { Authenticated } from './Authenticated';
import { NotAuthenticated } from './NotAuthenticated';
import { useUser } from '@auth0/nextjs-auth0';

export interface HeaderAuthProps {
  className?: string;
  loginHref?: string;
  registerHref?: string;
}

export const HeaderAuth: React.VFC<HeaderAuthProps> = ({ className, loginHref, registerHref }) => {
  // const { profile } = useSession();
  const { user } = useUser();

  return (
    <div className={className}>
      {user ? (
        <div className="w-max mr-0 ml-auto">
          <Authenticated userProfile={user} />
        </div>
      ) : (
        <NotAuthenticated loginHref={loginHref} registerHref={registerHref} />
      )}
    </div>
  );
};
