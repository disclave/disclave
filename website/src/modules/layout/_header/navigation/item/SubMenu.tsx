import React, { useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export interface SubMenuProps {
  text: string;
}

export const SubMenu: React.FC<SubMenuProps> = ({ children, text }) => {
  const [navExtended, setNavExtended] = useState(false);
  const toggleNav = () => setNavExtended(!navExtended);

  const wrapperClasses = classNames('group relative');
  const linkClasses = classNames('cursor-default group-hover:text-primary group-hover:underline');
  const contentClasses = classNames(
    'lg:absolute pt-2',
    navExtended ? 'visible opacity-100 block' : 'invisible opacity-0 hidden',
    'lg:invisible lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100',
    'lg:block',
    'transition-all duration-300'
  );
  const ulClasses = classNames(
    'lg:bg-white lg:rounded-b lg:shadow px-4 lg:py-4 w-max flex flex-col space-y-4'
  );

  const onClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
    toggleNav();
  };

  return (
    <li className={wrapperClasses} onClick={onClick}>
      <div className={linkClasses}>
        {text}
        <FontAwesomeIcon icon={faAngleDown} className="ml-2 text-sm" />
      </div>
      <div className={contentClasses}>
        <ul className={ulClasses}>{children}</ul>
      </div>
    </li>
  );
};
