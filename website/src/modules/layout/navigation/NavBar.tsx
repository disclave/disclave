import React from 'react';
import { NavItem } from './item';

export interface NavBarProps {
  toggleState: boolean;
}

export const NavBar: React.VFC<NavBarProps> = ({ toggleState }) => {
  const navClasses = [
    'flex flex-col',
    'md:flex-row md:justify-end',
    toggleState ? 'p-2 shadow' : ''
  ].join(' ');

  const ulClasses = [
    toggleState ? 'flex' : 'hidden md:flex',
    'flex-col md:flex-row',
    'space-y-3 md:space-y-0',
    'md:space-x-4'
  ].join(' ');

  return (
    <nav className={navClasses}>
      <ul className={ulClasses}>
        <NavItem href="/" text="Home" />
        <NavItem href="/test" text="Test" />
      </ul>
    </nav>
  );
};
