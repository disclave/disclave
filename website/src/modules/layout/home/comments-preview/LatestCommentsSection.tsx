import React from 'react';
import { useTranslation } from 'next-i18next';
import { RankingCommentModel } from '@disclave/client';
import { useLatestComments } from '@/modules/comments';
import { CommentsPreviewSection } from '@/modules/layout/home/comments-preview/CommentsPreviewSection';
import { latestCommentsHref } from '@/pages/comments/latest';

export interface LatestCommentsSectionProps {
  className?: string;
  commentsLimit: number;
  comments: Array<RankingCommentModel>;
  minVoteSum: number;
}

export const LatestCommentsSection: React.VFC<LatestCommentsSectionProps> = (props) => {
  const { t } = useTranslation('home');
  const { comments, voteRemove, voteUp, voteDown } = useLatestComments(
    props.comments,
    props.minVoteSum,
    props.commentsLimit
  );

  return (
    <CommentsPreviewSection
      className={props.className}
      comments={comments}
      header={t('comment rankings.latest.title')}
      href={latestCommentsHref()}
      onVoteDown={voteDown}
      onVoteRemove={voteRemove}
      onVoteUp={voteUp}
    />
  );
};
