import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export interface NavBtnProps {
  className?: string;
  navExtended: boolean;
  onClick: () => void;
}

export const NavBtn: React.VFC<NavBtnProps> = ({ className, navExtended, onClick }) => {
  const classes = ['w-7 h-7 mr-3', className ?? ''].join(' ');

  return (
    <button onClick={onClick} className={classes}>
      <FontAwesomeIcon icon={navExtended ? faTimes : faBars} />
    </button>
  );
};
