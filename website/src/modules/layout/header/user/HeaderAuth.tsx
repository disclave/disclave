import React from 'react';
import { Authenticated } from './Authenticated';
import { NotAuthenticated } from './NotAuthenticated';
import { useSession } from 'next-auth/client';

export interface HeaderAuthProps {
  className?: string;
  loginHref?: string;
  registerHref?: string;
}

export const HeaderAuth: React.VFC<HeaderAuthProps> = ({ className, loginHref, registerHref }) => {
  const [session] = useSession();

  return (
    <div className={className}>
      {session ? (
        <div className="w-max mr-0 ml-auto">
          <Authenticated userProfile={session.user} />
        </div>
      ) : (
        <NotAuthenticated loginHref={loginHref} registerHref={registerHref} />
      )}
    </div>
  );
};
