import React from 'react';

export interface FooterProps {}

export const Footer: React.VFC<FooterProps> = (props) => {
  return (
    <footer className="bg-gray-900 text-white px-8">
      <div className="container mx-auto pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-7">
          <div className="col-span-5">Menu</div>
          <div>Contact</div>
        </div>
        <div className="pt-8 text-gray-400 text-sm">© 2021 by Disclave</div>
      </div>
    </footer>
  );
};
