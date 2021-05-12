import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export interface NavBtnProps {
  className?: string;
  navExtended: boolean;
  onClick: () => void;
}

export const NavBtn: React.VFC<NavBtnProps> = ({ className, navExtended, onClick }) => {
  const classes = classNames('w-7 h-7 mr-3', className);

  return (
    <button onClick={onClick} className={classes}>
      <FontAwesomeIcon icon={navExtended ? faTimes : faBars} />
    </button>
  );
};
