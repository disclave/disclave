import React from 'react';

export const Header: React.VFC = () => {
  return (
    <header className="sticky top-0 bg-white lg:px-12 h-20 flex flex-row items-center">
      <div>Logo</div>
      <nav className="flex-grow text-right">navigation</nav>
      <div>user</div>
    </header>
  );
};
