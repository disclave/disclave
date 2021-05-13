import React from 'react';
import { useTranslation } from 'next-i18next';
import { PageModel } from '@disclave/client';
import { Button, PagesList } from '@disclave/ui';
import { websiteHrefFromIds } from '@/pages/website/[website]';
import { SectionHeader } from '../components';
import { topCommentedPagesHref } from '@/pages/pages/top-commented';

export interface TopCommentedPagesSectionProps {
  className?: string;
  pages: Array<PageModel>;
}

export const TopCommentedPagesSection: React.VFC<TopCommentedPagesSectionProps> = (props) => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <section className={props.className}>
      <SectionHeader>{t('pages rankings.top commented.title')}</SectionHeader>
      <PagesList className="py-8" hrefBuilder={websiteHrefFromIds} pages={props.pages} />
      <Button href={topCommentedPagesHref()} outlined>
        {t('common:buttons.view all')}
      </Button>
    </section>
  );
};
