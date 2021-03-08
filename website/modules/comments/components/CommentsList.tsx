import React from 'react';
import { CommentModel } from '../CommentModel';
import { Comment } from './Comment';

interface CommentsListProps {
  comments: Array<CommentModel>;
}

export const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  if (comments.length == 0) {
    return <p>No comments available</p>;
  }

  return (
    <>
      {comments.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}
    </>
  );
};
