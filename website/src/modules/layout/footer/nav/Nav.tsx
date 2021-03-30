import React from 'react';
import { NavItem } from './item';
import { useTranslation } from 'next-i18next';

export const Nav: React.VFC = () => {
  const { t } = useTranslation('layout');

  return (
    <nav>
      <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <ul className="space-y-2 fa-ul ml-5">
            <NavItem href="/" text={t('footer.nav.home')} />
            <NavItem href="/test" text="Test" />
          </ul>
        </div>
      </div>
    </nav>
  );
};
