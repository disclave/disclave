import React from 'react';
import { Header } from './header';
import { Footer } from './footer';

export interface LayoutProps {
  loginHref?: string;
  registerHref?: string;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header loginHref={props.loginHref} registerHref={props.registerHref} />
      <main className="flex-1">{props.children}</main>
      <Footer />
    </div>
  );
};
