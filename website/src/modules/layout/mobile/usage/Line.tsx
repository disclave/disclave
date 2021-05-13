import classNames from 'classnames';
import React from 'react';

export const Line: React.VFC = () => {
  const className = classNames(
    'absolute block',
    'w-1.5 rounded',
    'top-0 bottom-0',
    'left-3 lg:left-1/2',
    'transform -translate-x-1/2',
    'bg-gradient-to-b from-primary-light to-primary-dark'
  );

  return <div className={className}></div>;
};
