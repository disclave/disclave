import React from 'react';

export const Anchor: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({ children, ...props }) => {
  return (
    <a className="text-primary hover:underline" {...props}>
      {children}
    </a>
  );
};
