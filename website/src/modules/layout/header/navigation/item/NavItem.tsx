import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface NavItemProps {
  href: string;
  text: string;
}

export const NavItem: React.VFC<NavItemProps> = ({ href, text }) => {
  const { asPath } = useRouter();
  const isActive = asPath === href;

  const className = [
    'transition-colors',
    'hover:text-primary hover:underline',
    isActive ? 'text-primary underline' : ''
  ].join(' ');

  return (
    <li>
      <Link href={href}>
        <a className={className}>{text}</a>
      </Link>
    </li>
  );
};
