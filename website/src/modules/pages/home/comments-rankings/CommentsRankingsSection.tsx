import React from 'react';
import { useTranslation } from 'next-i18next';
import { CommentModel } from '@disclave/client';
import { Button, PreviewCommentsList } from '@disclave/ui';
import { useLatestComments, useTopComments } from '@/modules/comments';
import { websiteHrefFromMeta } from '@/pages/website/[website]';
import { topCommentsHref } from '@/pages/comments/top';
import { latestCommentsHref } from '@/pages/comments/latest';
import { useUserProfile } from '@/modules/auth';

export interface CommentsRankingsSectionProps {
  commentsLimit: number;
  topComments: Array<CommentModel>;
  topMinVoteSum: number;
  latestComments: Array<CommentModel>;
  latestMinVoteSum: number;
}

export const CommentsRankingsSection: React.VFC<CommentsRankingsSectionProps> = (props) => {
  const { t } = useTranslation(['home', 'common']);
  const { profile } = useUserProfile();

  const top = useTopComments(props.topComments, props.topMinVoteSum, props.commentsLimit);
  const latest = useLatestComments(
    props.latestComments,
    props.latestMinVoteSum,
    props.commentsLimit
  );

  const CommentsPreviewList = ({ comments, onVoteUp, onVoteDown, onVoteRemove }) => (
    <PreviewCommentsList
      actionsHandler={{ onVoteDown, onVoteRemove, onVoteUp }}
      authenticated={!!profile}
      comments={comments}
      hrefBuilder={websiteHrefFromMeta}
    />
  );

  const ViewAllBtn = ({ href }) => (
    <div>
      <Button href={href} outlined>
        {t('common:buttons.view all')}
      </Button>
    </div>
  );

  const ListHeader = ({ title, href }) => (
    <div className="flex flex-row justify-between items-center mb-8">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <ViewAllBtn href={href} />
    </div>
  );

  return (
    <section>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-4 gap-8">
          <div>
            <ListHeader href={topCommentsHref()} title={t('comment rankings.top.title')} />
            <CommentsPreviewList
              comments={top.comments}
              onVoteUp={top.voteUp}
              onVoteDown={top.voteDown}
              onVoteRemove={top.voteRemove}
            />
          </div>
          <div>
            <ListHeader href={latestCommentsHref()} title={t('comment rankings.latest.title')} />
            <CommentsPreviewList
              comments={latest.comments}
              onVoteUp={latest.voteUp}
              onVoteDown={latest.voteDown}
              onVoteRemove={latest.voteRemove}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
