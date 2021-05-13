import classNames from 'classnames';
import React from 'react';

export const Dot: React.VFC = () => {
  const className = classNames(
    'absolute block',
    'w-8 h-8',
    'top-0 left-1/2 transform -translate-x-1/2',
    'rounded-full border-8 border-white shadow',
    'bg-gradient-to-b from-primary-light to-primary-dark'
  );

  return <div className={className}></div>;
};
