import React from 'react';

export const List: React.FC = ({ children }) => {
  return <ul className="list-disc pb-4">{children}</ul>;
};
