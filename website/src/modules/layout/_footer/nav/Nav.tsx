import React from 'react';
import { NavItem } from './item';
import { useTranslation } from 'next-i18next';
import { homeHref } from '@/pages';
import { topCommentsHref } from '@/pages/comments/top';
import { latestCommentsHref } from '@/pages/comments/latest';
import { pluginsHref } from '@/pages/plugins';
import { extensionsHref } from '@/pages/extensions';
import { topCommentedPagesHref } from '@/pages/pages/top-commented';
import { mobileHref } from '@/pages/mobile';
import { blogHref } from '@/pages/blog';
import { topRatedPagesHref } from '@/pages/pages/top-rated';

export const Nav: React.VFC = () => {
  const { t } = useTranslation('layout');

  return (
    <nav>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-2">
        <div>
          <ul className="space-y-2 fa-ul ml-5">
            <NavItem href={homeHref()} text={t('footer.nav.home')} />
            <NavItem href={blogHref()} text={t('footer.nav.blog')} />
            <NavItem href={pluginsHref()} text={t('footer.nav.plugins')} />
            <NavItem href={extensionsHref()} text={t('footer.nav.extensions')} />
            <NavItem href={mobileHref()} text={t('footer.nav.mobile')} />
          </ul>
        </div>
        <div>
          <ul className="space-y-2 fa-ul ml-5">
            <NavItem href={topCommentsHref()} text={t('footer.nav.top comments')} />
            <NavItem href={topCommentedPagesHref()} text={t('footer.nav.top commented pages')} />
            <NavItem href={topRatedPagesHref()} text={t('footer.nav.top rated pages')} />
            <NavItem href={latestCommentsHref()} text={t('footer.nav.latest comments')} />
          </ul>
        </div>
      </div>
    </nav>
  );
};
