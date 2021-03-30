import React from 'react';
import { NavItem } from './item';
import { useTranslation } from 'next-i18next';

export interface NavBarProps {
  toggleState: boolean;
}

export const NavBar: React.VFC<NavBarProps> = ({ toggleState }) => {
  const { t } = useTranslation('layout');

  const navClasses = [
    'flex flex-col',
    'md:flex-row md:justify-end',
    toggleState ? 'p-2 shadow' : ''
  ].join(' ');

  const ulClasses = [
    toggleState ? 'flex' : 'hidden md:flex',
    'flex-col md:flex-row',
    'space-y-4 md:space-y-0',
    'md:space-x-4'
  ].join(' ');

  return (
    <nav className={navClasses}>
      <ul className={ulClasses}>
        <NavItem href="/" text={t('header.main nav.home')} />
        <NavItem href="/test" text="Test" />
      </ul>
    </nav>
  );
};
