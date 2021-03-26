import React from 'react';
import { Header } from './header';

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  );
};
