import React from 'react';
import { useTranslation } from 'next-i18next';
import { RankingCommentModel, useSession } from '@disclave/client';
import { Button, RankingCommentsList } from '@disclave/ui';
import { websiteHrefFromMeta } from '@/pages/website/[website]';
import { SectionHeader } from '../components';

export interface CommentsPreviewSectionProps {
  className?: string;
  comments: Array<RankingCommentModel>;
  header: string;
  href: string;
  onVoteDown: (commentId: string) => Promise<void>;
  onVoteRemove: (commentId: string) => Promise<void>;
  onVoteUp: (commentId: string) => Promise<void>;
}

export const CommentsPreviewSection: React.VFC<CommentsPreviewSectionProps> = (props) => {
  const { t } = useTranslation('common');
  const { isAuthenticated } = useSession();

  return (
    <section className={props.className}>
      <SectionHeader>{props.header}</SectionHeader>
      <RankingCommentsList
        className="py-8"
        actionsHandler={{
          onVoteDown: props.onVoteDown,
          onVoteRemove: props.onVoteRemove,
          onVoteUp: props.onVoteUp
        }}
        authenticated={isAuthenticated}
        comments={props.comments}
        hrefBuilder={websiteHrefFromMeta}
      />

      <Button href={props.href} outlined>
        {t('buttons.view all')}
      </Button>
    </section>
  );
};
