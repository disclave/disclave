import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export interface NavItemProps {
  href: string;
  text: string;
}

export const NavItem: React.VFC<NavItemProps> = ({ href, text }) => {
  const { asPath } = useRouter();
  const isActive = asPath === href;

  const classes = classNames('transition-colors hover:text-primary hover:underline', {
    'text-primary underline': isActive
  });

  return (
    <li>
      <Link href={href}>
        <a className={classes}>{text}</a>
      </Link>
    </li>
  );
};
