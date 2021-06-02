import React from 'react';
import { useTranslation } from 'next-i18next';
import { PageModel, useSession } from '@disclave/client';
import { Button, PagesList } from '@disclave/ui';
import { websiteHref } from '@/pages/website/[website]';
import { SectionHeader } from '../components';

export interface PagesPreviewSectionProps {
  className?: string;
  pages: Array<PageModel>;
  header: string;
  href: string;
  onVoteDown: (url: string) => Promise<void>;
  onVoteRemove: (url: string) => Promise<void>;
  onVoteUp: (url: string) => Promise<void>;
}

export const PagesPreviewSection: React.VFC<PagesPreviewSectionProps> = (props) => {
  const { t } = useTranslation(['common']);
  const { isAuthenticated } = useSession();

  return (
    <section className={props.className}>
      <SectionHeader>{props.header}</SectionHeader>
      <PagesList
        className="py-8"
        actionHandler={{
          onVoteDown: props.onVoteDown,
          onVoteRemove: props.onVoteRemove,
          onVoteUp: props.onVoteUp
        }}
        authenticated={isAuthenticated}
        hrefBuilder={websiteHref}
        pages={props.pages}
      />

      <Button href={props.href} outlined>
        {t('buttons.view all')}
      </Button>
    </section>
  );
};
