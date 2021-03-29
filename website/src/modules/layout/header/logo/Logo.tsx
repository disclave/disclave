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
        <div className="hidden md:block">
          <Image
            src="/logo/base_logo_transparent.png"
            alt=""
            width={134}
            height={80}
            priority={true}
            quality={100}
          />
        </div>
        <div className="block md:hidden">
          <Image
            src="/logo/base_icon_transparent.png"
            alt=""
            width={55}
            height={40}
            priority={true}
            quality={100}
          />
        </div>
      </a>
    </Link>
  );
};