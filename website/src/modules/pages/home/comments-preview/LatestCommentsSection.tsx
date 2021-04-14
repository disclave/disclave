import React from 'react';
import { useTranslation } from 'next-i18next';
import { CommentModel } from '@disclave/client';
import { useLatestComments } from '@/modules/comments';
import { CommentsPreviewSection } from '@/modules/pages/home/comments-preview/CommentsPreviewSection';
import { latestCommentsHref } from '@/pages/comments/latest';

export interface LatestCommentsSectionProps {
  commentsLimit: number;
  comments: Array<CommentModel>;
  minVoteSum: number;
  serverSideUid: string | null;
}

export const LatestCommentsSection: React.VFC<LatestCommentsSectionProps> = (props) => {
  const { t } = useTranslation(['home']);
  const { comments, voteRemove, voteUp, voteDown } = useLatestComments(
    props.comments,
    props.minVoteSum,
    props.commentsLimit,
    props.serverSideUid
  );

  return (
    <CommentsPreviewSection
      commentsLimit={props.commentsLimit}
      comments={comments}
      header={t('comment rankings.latest.title')}
      href={latestCommentsHref()}
      minVoteSum={props.minVoteSum}
      serverSideUid={props.serverSideUid}
      onVoteDown={voteDown}
      onVoteRemove={voteRemove}
      onVoteUp={voteUp}
    />
  );
};
