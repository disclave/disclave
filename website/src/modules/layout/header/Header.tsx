import React, { useState } from 'react';
import { Logo } from './logo';
import { NavBar } from '../navigation';

export const Header: React.VFC = () => {
  const [navExtended, setNavExtended] = useState(false);
  const toggleNav = () => setNavExtended(!navExtended);

  const headerClasses = [
    'h-12 md:h-20',
    'py-1',
    'lg:mx-12',
    'flex items-center',
    'flex-wrap md:flex-nowrap'
  ].join(' ');

  return (
    <div className="sticky top-0 bg-white shadow">
      <header className={headerClasses}>
        <Logo className="ml-3 md:ml-0" />
        <div className="md:order-2 flex-grow md:flex-grow-0 text-right mx-2">user</div>
        <button onClick={toggleNav} className="md:hidden w-7 h-7 mr-3">
          TG
        </button>
        <div className="flex-full md:mx-4 bg-white">
          <NavBar toggleState={navExtended} />
        </div>
      </header>
    </div>
  );
};
