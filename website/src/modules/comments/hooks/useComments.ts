import { useState } from 'react';
import {
  CommentModel,
  createComment,
  addCommentVoteDown,
  removeCommentVote,
  addCommentVoteUp
} from '@disclave/client';

type AddComment = (text: string) => Promise<void>;
type AddVoteUp = (commentId: string) => Promise<void>;
type AddVoteDown = (commentId: string) => Promise<void>;
type RemoveVote = (commentId: string) => Promise<void>;
type UseComments = {
  comments: CommentModel[];
  addComment: AddComment;
  addVoteUp: AddVoteUp;
  addVoteDown: AddVoteDown;
  removeVote: RemoveVote;
};

export const useComments = (initialState: Array<CommentModel>, website: string): UseComments => {
  const [comments, setComments] = useState(initialState);

  const addComment: AddComment = async (text: string) => {
    const addedComment = await createComment(text, website);
    setComments([addedComment, ...comments]);
  };

  const addVoteUp = async (commentId: string) => {
    await addCommentVoteUp(commentId);
  };

  const addVoteDown = async (commentId: string) => {
    await addCommentVoteDown(commentId);
  };

  const removeVote = async (commentId: string) => {
    await removeCommentVote(commentId);
  };

  return {
    comments: comments,
    addComment: addComment,
    addVoteUp: addVoteUp,
    addVoteDown: addVoteDown,
    removeVote: removeVote
  };
};
