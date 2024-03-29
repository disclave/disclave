import React from 'react';
import { useTranslation } from 'next-i18next';
import { RankingCommentModel } from '@disclave/client';
import { useTopComments } from '@/modules/comments';
import { CommentsPreviewSection } from '@/modules/layout/home/comments-preview/CommentsPreviewSection';
import { topCommentsHref } from '@/pages/comments/top';

export interface TopCommentsSectionProps {
  className?: string;
  commentsLimit: number;
  comments: Array<RankingCommentModel>;
  minVoteSum: number;
}

export const TopCommentsSection: React.VFC<TopCommentsSectionProps> = (props) => {
  const { t } = useTranslation('home');
  const { comments, voteRemove, voteUp, voteDown } = useTopComments(
    props.comments,
    props.minVoteSum,
    props.commentsLimit
  );

  return (
    <CommentsPreviewSection
      className={props.className}
      comments={comments}
      header={t('comment rankings.top.title')}
      href={topCommentsHref()}
      onVoteDown={voteDown}
      onVoteRemove={voteRemove}
      onVoteUp={voteUp}
    />
  );
};
