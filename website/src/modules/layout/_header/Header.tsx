import classNames from 'classnames';
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

  const headerClasses = classNames(
    'h-12 md:h-20 box-content',
    'py-1 md:mx-12',
    'flex items-center flex-wrap lg:flex-nowrap'
  );

  return (
    <div className="sticky top-0 bg-white shadow z-50">
      <header className={headerClasses}>
        <Logo className="ml-3 lg:ml-0" />
        <HeaderAuth
          className="lg:order-2 flex-grow lg:flex-grow-0 mx-2 justify-items-end"
          loginHref={props.loginHref}
          registerHref={props.registerHref}
        />
        <NavBtn navExtended={navExtended} onClick={toggleNav} className="lg:hidden" />
        <div className="flex-full lg:flex-1 lg:mx-4 bg-white">
          <NavBar toggleState={navExtended} />
        </div>
      </header>
    </div>
  );
};
