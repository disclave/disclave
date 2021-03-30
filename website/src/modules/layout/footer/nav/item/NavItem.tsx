import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export interface NavItemProps {
  href: string;
  text: string;
}

export const NavItem: React.VFC<NavItemProps> = ({ href, text }) => {
  return (
    <li className="flex flex-row items-center transition-colors text-gray-100 hover:text-gray-300">
      <FontAwesomeIcon icon={faAngleRight} listItem />
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </li>
  );
};
