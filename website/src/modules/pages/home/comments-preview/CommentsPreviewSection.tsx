import React from 'react';
import { useTranslation } from 'next-i18next';
import { CommentModel, useSession } from '@disclave/client';
import { Button, PreviewCommentsList } from '@disclave/ui';
import { websiteHrefFromMeta } from '@/pages/website/[website]';

export interface CommentsPreviewSectionProps {
  commentsLimit: number;
  comments: Array<CommentModel>;
  header: string;
  href: string;
  minVoteSum: number;
  serverSideUid: string | null;
  onVoteDown: (commentId: string) => Promise<void>;
  onVoteRemove: (commentId: string) => Promise<void>;
  onVoteUp: (commentId: string) => Promise<void>;
}

export const CommentsPreviewSection: React.VFC<CommentsPreviewSectionProps> = (props) => {
  const { t } = useTranslation(['common']);
  const { profile } = useSession();

  return (
    <section>
      <div className="flex flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">{props.header}</h2>
        <div>
          <Button href={props.href} outlined>
            {t('buttons.view all')}
          </Button>
        </div>
      </div>
      <PreviewCommentsList
        actionsHandler={{
          onVoteDown: props.onVoteDown,
          onVoteRemove: props.onVoteRemove,
          onVoteUp: props.onVoteUp
        }}
        authenticated={!!profile}
        comments={props.comments}
        hrefBuilder={websiteHrefFromMeta}
      />
    </section>
  );
};
