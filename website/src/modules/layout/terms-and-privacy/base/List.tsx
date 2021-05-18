import classNames from 'classnames';
import React from 'react';

export interface ListProps {
  decimal?: boolean;
}

export const List: React.FC<ListProps> = ({ children, decimal }) => {
  const className = classNames('pb-4', decimal ? 'list-decimal' : 'list-disc');
  return <ul className={className}>{children}</ul>;
};
