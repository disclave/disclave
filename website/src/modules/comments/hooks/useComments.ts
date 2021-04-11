import { useEffect, useState, useRef } from 'react';
import {
  CommentModel,
  getComments,
  createComment,
  addCommentVoteDown,
  removeCommentVote,
  addCommentVoteUp,
  useSession
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

export const useComments = (
  initialState: Array<CommentModel>,
  website: string,
  serverSideUid: string | null
): UseComments => {
  const [comments, setComments] = useState(initialState);
  const { profile, isLoading } = useSession();
  const prevUid = useRef(serverSideUid);

  const fetchComments = async (noCache: boolean) => {
    const result = await getComments(website, noCache);
    setComments(result);
  };

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

  useEffect(() => {
    if (isLoading) return;

    if (profile?.uid != prevUid.current) fetchComments(true);

    prevUid.current = profile?.uid;
  }, [profile?.uid, isLoading]);

  return {
    comments: comments,
    addComment: addComment,
    addVoteUp: addVoteUp,
    addVoteDown: addVoteDown,
    removeVote: removeVote
  };
};
