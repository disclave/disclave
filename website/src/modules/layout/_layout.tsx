import React from 'react';
import { Header } from './_header';
import { Footer } from './_footer';

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
