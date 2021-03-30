import React, { useState } from 'react';
import { Logo } from './logo';
import { NavBar } from '../navigation';
import { Authenticated, NotAuthenticated } from './user';
import { useSession } from '@disclave/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export interface HeaderProps {
  loginHref?: string;
  registerHref?: string;
}

export const Header: React.VFC<HeaderProps> = (props) => {
  const [userProfile] = useSession();
  const [navExtended, setNavExtended] = useState(false);
  const toggleNav = () => setNavExtended(!navExtended);

  const headerClasses = [
    'h-12 md:h-20 box-content',
    'py-1',
    'lg:mx-12',
    'flex items-center',
    'flex-wrap md:flex-nowrap'
  ].join(' ');

  return (
    <div className="sticky top-0 bg-white shadow">
      <header className={headerClasses}>
        <Logo className="ml-3 md:ml-0" />
        <div className="md:order-2 flex-grow md:flex-grow-0 mx-2 justify-items-end">
          {userProfile ? (
            <div className="w-max mr-0 ml-auto">
              <Authenticated userProfile={userProfile} />
            </div>
          ) : (
            <NotAuthenticated loginHref={props.loginHref} registerHref={props.registerHref} />
          )}
        </div>
        <button onClick={toggleNav} className="md:hidden w-7 h-7 mr-3">
          <FontAwesomeIcon icon={navExtended ? faTimes : faBars} />
        </button>
        <div className="flex-full md:flex-1 md:mx-4 bg-white">
          <NavBar toggleState={navExtended} />
        </div>
      </header>
    </div>
  );
};
