import { useState } from 'react';
import { CommentModel, createComment } from '@webchat/client';

type AddComment = (text: string) => Promise<void>;

export const useComments = (
  initialState: Array<CommentModel>,
  website: string
): [Array<CommentModel>, AddComment] => {
  const [comments, setComments] = useState(initialState);

  const addComment: AddComment = async (text: string) => {
    const addedComment = await createComment(text, website);
    setComments([addedComment, ...comments]);
  };

  return [comments, addComment];
};
