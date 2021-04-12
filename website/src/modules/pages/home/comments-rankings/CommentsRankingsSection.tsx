import React from 'react';
import { useTranslation } from 'next-i18next';
import {
  addCommentVoteDown,
  addCommentVoteUp,
  CommentModel,
  removeCommentVote,
  useSession
} from '@disclave/client';
import { CommentsList } from '@disclave/ui';
import { useLatestComments, useTopComments } from '@/modules/comments';

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

  const onVoteUp = async (commentId: string) => {
    await addCommentVoteUp(commentId);
  };

  const onVoteDown = async (commentId: string) => {
    await addCommentVoteDown(commentId);
  };

  const onVoteRemove = async (commentId: string) => {
    await removeCommentVote(commentId);
  };

  const CommentsPreviewList = ({ comments }) => (
    <CommentsList
      authenticated={!!profile}
      comments={comments}
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
            <CommentsPreviewList comments={top.comments} />
          </div>
          <div>
            <div className={titleClassNames}>{t('comment rankings.latest.title')}</div>
            <CommentsPreviewList comments={latest.comments} />
          </div>
        </div>
      </div>
    </section>
  );
};
