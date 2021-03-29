import React from 'react';
import { NavItem } from './item';

export interface NavBarProps {
  toggleState: boolean;
}

export const NavBar: React.VFC<NavBarProps> = ({ toggleState }) => {
  const menuDisplayClass = toggleState ? 'flex' : 'hidden md:flex';

  const navClasses = [
    'flex flex-col',
    'md:flex-row md:justify-end',
    toggleState ? 'p-2 shadow' : ''
  ].join(' ');

  return (
    <nav className={navClasses}>
      <ul className={`${menuDisplayClass} flex-col md:flex-row md:space-x-4`}>
        <NavItem href="/" text="Home" />
        <NavItem href="/test" text="Test" />
      </ul>
    </nav>
  );
};
