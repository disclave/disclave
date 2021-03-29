import React from 'react';
import { Header } from './header';

export interface LayoutProps {
  loginHref?: string;
  registerHref?: string;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div>
      <Header loginHref={props.loginHref} registerHref={props.registerHref} />
      <main>{props.children}</main>
      <footer>footer</footer>
    </div>
  );
};
