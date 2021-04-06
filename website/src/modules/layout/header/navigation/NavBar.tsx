import React from 'react';
import { NavItem } from './item';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

export interface NavBarProps {
  toggleState: boolean;
}

export const NavBar: React.VFC<NavBarProps> = ({ toggleState }) => {
  const { t } = useTranslation('layout');

  const navClasses = classNames(
    'flex flex-col md:flex-row md:justify-end',
    { 'p-2 shadow' : toggleState }
  );

  const ulClasses = classNames(
    toggleState ? 'flex' : 'hidden md:flex',
    'flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'
  );

  return (
    <nav className={navClasses}>
      <ul className={ulClasses}>
        <NavItem href="/" text={t('header.main nav.home')} />
      </ul>
    </nav>
  );
};
