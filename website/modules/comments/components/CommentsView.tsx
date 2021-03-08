import React from 'react';
import { CommentModel } from '../CommentModel';
import { CommentsList } from './CommentsList';
import { CommentAdd } from './CommentAdd';

interface CommentsViewProps {
  comments: Array<CommentModel>;
  onCommentAdd: (text: string) => Promise<void>;
}

export const CommentsView: React.FC<CommentsViewProps> = ({ comments, onCommentAdd }) => {
  return (
    <>
      <CommentsList comments={comments} />
      <CommentAdd onSubmit={onCommentAdd} />
    </>
  );
};
