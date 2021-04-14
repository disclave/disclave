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
          <img src="/logo/base_logo_transparent.png" alt="" width={134} height={80} />
        </div>
        <div className="block md:hidden">
          <img src="/logo/base_icon_transparent.png" alt="" width={55} height={40} />
        </div>
      </a>
    </Link>
  );
};
