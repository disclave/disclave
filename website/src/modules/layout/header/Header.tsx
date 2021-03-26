import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Header: React.VFC = () => {
  return (
    <header className="sticky top-0 bg-white lg:px-12 h-20 flex flex-row items-center">
      <Link href="/">
        <a>
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
      <nav className="flex-grow text-right">navigation</nav>
      <div>user</div>
    </header>
  );
};
