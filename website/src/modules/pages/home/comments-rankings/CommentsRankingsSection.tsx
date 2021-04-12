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

  return (
    <section>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-4">
          <div>
            <CommentsList
              authenticated={!!profile}
              comments={top.comments}
              showWebsite={true}
              onVoteUp={onVoteUp}
              onVoteDown={onVoteDown}
              onVoteRemove={onVoteRemove}
            />
          </div>
          <div>
            <CommentsList
              authenticated={!!profile}
              comments={latest.comments}
              showWebsite={true}
              onVoteUp={onVoteUp}
              onVoteDown={onVoteDown}
              onVoteRemove={onVoteRemove}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
