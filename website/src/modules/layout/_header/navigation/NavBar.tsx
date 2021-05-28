import React from 'react';
import { NavItem, SubMenu } from './item';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { homeHref } from '@/pages';
import { latestCommentsHref } from '@/pages/comments/latest';
import { topCommentsHref } from '@/pages/comments/top';
import { pluginsHref } from '@/pages/plugins';
import { extensionsHref } from '@/pages/extensions';
import { topCommentedPagesHref } from '@/pages/pages/top-commented';
import { mobileHref } from '@/pages/mobile';
import { topRatedPagesHref } from '@/pages/pages/top-rated';
import { blogHref } from '@/pages/blog';

export interface NavBarProps {
  toggleState: boolean;
}

export const NavBar: React.VFC<NavBarProps> = ({ toggleState }) => {
  const { t } = useTranslation('layout');

  const navClasses = classNames('flex flex-col lg:flex-row lg:justify-end', {
    'p-2 shadow': toggleState
  });

  const ulClasses = classNames(
    toggleState ? 'flex' : 'hidden lg:flex',
    'flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 lg:items-center'
  );

  return (
    <nav className={navClasses}>
      <ul className={ulClasses}>
        <NavItem href={homeHref()} text={t('header.main nav.home')} />
        <SubMenu text={t('header.main nav.comments.label')}>
          <NavItem href={topCommentsHref()} text={t('header.main nav.comments.items.top')} />
          <NavItem href={latestCommentsHref()} text={t('header.main nav.comments.items.latest')} />
        </SubMenu>
        <SubMenu text={t('header.main nav.pages.label')}>
          <NavItem
            href={topCommentedPagesHref()}
            text={t('header.main nav.pages.items.top commented')}
          />
          <NavItem href={topRatedPagesHref()} text={t('header.main nav.pages.items.top rated')} />
        </SubMenu>
        <NavItem href={blogHref()} text={t('header.main nav.blog')} />
        <NavItem href={pluginsHref()} text={t('header.main nav.plugins')} />
        <NavItem href={extensionsHref()} text={t('header.main nav.extensions')} />
        <NavItem href={mobileHref()} text={t('header.main nav.mobile')} />
      </ul>
    </nav>
  );
};
