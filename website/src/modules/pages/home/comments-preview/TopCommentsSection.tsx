import React from 'react';
import { useTranslation } from 'next-i18next';
import { CommentModel } from '@disclave/client';
import { useTopComments } from '@/modules/comments';
import { CommentsPreviewSection } from '@/modules/pages/home/comments-preview/CommentsPreviewSection';
import { topCommentsHref } from '@/pages/comments/top';

export interface TopCommentsSectionProps {
  className?: string;
  commentsLimit: number;
  comments: Array<CommentModel>;
  minVoteSum: number;
}

export const TopCommentsSection: React.VFC<TopCommentsSectionProps> = (props) => {
  const { t } = useTranslation(['home']);
  const { comments, voteRemove, voteUp, voteDown } = useTopComments(
    props.comments,
    props.minVoteSum,
    props.commentsLimit
  );

  return (
    <CommentsPreviewSection
      className={props.className}
      commentsLimit={props.commentsLimit}
      comments={comments}
      header={t('comment rankings.top.title')}
      href={topCommentsHref()}
      minVoteSum={props.minVoteSum}
      onVoteDown={voteDown}
      onVoteRemove={voteRemove}
      onVoteUp={voteUp}
    />
  );
};
