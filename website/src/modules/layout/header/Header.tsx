import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NavBar } from '../navigation';

export const Header: React.VFC = () => {
  const [navExtended, setNavExtended] = useState(false);
  const toggleNav = () => setNavExtended(!navExtended);

  const headerClasses = [
    'sticky top-0',
    'bg-white',
    'lg:mx-12 h-20',
    'flex items-center',
    'flex-wrap md:flex-nowrap'
  ].join(' ');

  return (
    <header className={headerClasses}>
      <Link href="/">
        <a className="ml-3 md:ml-0">
          <Image
            src="/logo/base_logo_transparent.png"
            alt=""
            width={134}
            height={80}
            priority={true}
            quality={100}
          />
        </a>
      </Link>
      <div className="md:order-2 flex-grow md:flex-grow-0 text-right mx-2">user</div>
      <button onClick={toggleNav} className="md:hidden w-7 h-7 mr-3">
        TG
      </button>
      <div className="flex-full md:mx-4 pb-3 md:pb-0 bg-white">
        <NavBar toggleState={navExtended} />
      </div>
    </header>
  );
};
