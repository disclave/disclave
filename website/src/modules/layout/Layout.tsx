import React from 'react';
import { Header } from './header';
import { Footer } from './footer';

export interface LayoutProps {
  loginHref?: string;
  registerHref?: string;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div>
      <Header loginHref={props.loginHref} registerHref={props.registerHref} />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
