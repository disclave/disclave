import React, { useState } from 'react';
import { Logo } from './logo';
import { NavBar, NavBtn } from './navigation';
import { HeaderAuth } from './user';

export interface HeaderProps {
  loginHref?: string;
  registerHref?: string;
}

export const Header: React.VFC<HeaderProps> = (props) => {
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
    <div className="sticky top-0 bg-white shadow z-50">
      <header className={headerClasses}>
        <Logo className="ml-3 md:ml-0" />
        <HeaderAuth className="md:order-2 flex-grow md:flex-grow-0 mx-2 justify-items-end" />
        <NavBtn navExtended={navExtended} onClick={toggleNav} className="md:hidden" />
        <div className="flex-full md:flex-1 md:mx-4 bg-white">
          <NavBar toggleState={navExtended} />
        </div>
      </header>
    </div>
  );
};
