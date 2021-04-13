import React from 'react';
import { useTranslation } from 'next-i18next';
import { CommentModel, useSession } from '@disclave/client';
import { CommentsList } from '@disclave/ui';
import { useLatestComments, useTopComments } from '@/modules/comments';
import { websiteHrefFromMeta } from '@/pages/website/[website]';

export interface CommentsRankingsSectionProps {
  commentsLimit: number;
  topComments: Array<CommentModel>;
  topMinVoteSum: number;
  latestComments: Array<CommentModel>;
  latestMinVoteSum: number;
  serverSideUid: string | null;
}

export const CommentsRankingsSection: React.VFC<CommentsRankingsSectionProps> = (props) => {
  const { t } = useTranslation('home');
  const { profile } = useSession();

  const top = useTopComments(
    props.topComments,
    props.topMinVoteSum,
    props.commentsLimit,
    props.serverSideUid
  );

  const latest = useLatestComments(
    props.latestComments,
    props.latestMinVoteSum,
    props.commentsLimit,
    props.serverSideUid
  );

  const CommentsPreviewList = ({ comments, onVoteUp, onVoteDown, onVoteRemove }) => (
    <CommentsList
      authenticated={!!profile}
      comments={comments}
      hrefBuilder={websiteHrefFromMeta}
      preview={true}
      showWebsite={true}
      onVoteUp={onVoteUp}
      onVoteDown={onVoteDown}
      onVoteRemove={onVoteRemove}
    />
  );

  const titleClassNames = 'text-3xl font-semibold mb-8';

  return (
    <section>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-4 gap-8">
          <div>
            <div className={titleClassNames}>{t('comment rankings.top.title')}</div>
            <CommentsPreviewList
              comments={top.comments}
              onVoteUp={top.voteUp}
              onVoteDown={top.voteDown}
              onVoteRemove={top.voteRemove}
            />
          </div>
          <div>
            <div className={titleClassNames}>{t('comment rankings.latest.title')}</div>
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
