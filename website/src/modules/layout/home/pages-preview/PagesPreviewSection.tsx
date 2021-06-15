import React from 'react';
import { useTranslation } from 'next-i18next';
import { RankingPageModel, useSession } from '@disclave/client';
import { Button, RankingPagesList } from '@disclave/ui';
import { websiteHref } from '@/pages/website/[website]';
import { SectionHeader } from '../components';

export interface PagesPreviewSectionProps {
  className?: string;
  pages: Array<RankingPageModel>;
  header: string;
  href: string;
  onVoteDown: (websiteId: string, pageId: string) => Promise<void>;
  onVoteRemove: (websiteId: string, pageId: string) => Promise<void>;
  onVoteUp: (websiteId: string, pageId: string) => Promise<void>;
}

export const PagesPreviewSection: React.VFC<PagesPreviewSectionProps> = (props) => {
  const { t } = useTranslation('common');
  const { isAuthenticated } = useSession();

  return (
    <section className={props.className}>
      <SectionHeader>{props.header}</SectionHeader>
      <RankingPagesList
        className="py-8"
        actionHandler={{
          onVoteDown: props.onVoteDown,
          onVoteRemove: props.onVoteRemove,
          onVoteUp: props.onVoteUp
        }}
        authenticated={isAuthenticated}
        hideDomain={false}
        hideLogo={false}
        hrefBuilder={websiteHref}
        loading={false}
        pages={props.pages}
      />

      <Button href={props.href} outlined>
        {t('buttons.view all')}
      </Button>
    </section>
  );
};
