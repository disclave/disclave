import React from 'react';
import { NavItem } from './item';
import { useTranslation } from 'next-i18next';
import { homeHref } from '@/pages';
import { topCommentsHref } from '@/pages/comments/top';
import { latestCommentsHref } from '@/pages/comments/latest';
import { pluginsHref } from '@/pages/plugins';

export const Nav: React.VFC = () => {
  const { t } = useTranslation('layout');

  return (
    <nav>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div>
          <ul className="space-y-2 fa-ul ml-5">
            <NavItem href={homeHref()} text={t('footer.nav.home')} />
            <NavItem href={pluginsHref()} text={t('footer.nav.plugins')} />
          </ul>
        </div>
        <div>
          <ul className="space-y-2 fa-ul ml-5">
            <NavItem href={topCommentsHref()} text={t('header.main nav.top comments')} />
            <NavItem href={latestCommentsHref()} text={t('header.main nav.latest comments')} />
          </ul>
        </div>
      </div>
    </nav>
  );
};
