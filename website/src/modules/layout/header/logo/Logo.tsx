import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface LogoProps {
  className?: string;
}

export const Logo: React.VFC<LogoProps> = ({ className }) => {
  return (
    <Link href="/">
      <a className={className}>
        <Image
          className="hidden md:block"
          src="/logo/base_logo_transparent.png"
          alt=""
          width={134}
          height={80}
          priority={true}
          quality={100}
        />
        <Image
          src="/logo/base_icon_transparent.png"
          alt="block md:hidden"
          width={110}
          height={80}
          priority={true}
          quality={100}
        />
      </a>
    </Link>
  );
};
