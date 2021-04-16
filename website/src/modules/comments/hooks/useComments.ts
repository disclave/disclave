import { useEffect, useState, useRef } from 'react';
import {
  addCommentVoteDown,
  addCommentVoteUp,
  CommentModel,
  removeCommentVote,
  useSession
} from '@disclave/client';

type SetComments = (data: Array<CommentModel>) => void;
type VoteDown = (commentId: string) => Promise<void>;
type VoteRemove = (commentId: string) => Promise<void>;
type VoteUp = (commentId: string) => Promise<void>;
type UseComments = {
  comments: CommentModel[];
  setComments: SetComments;
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const useComments = (
  initialState: Array<CommentModel>,
  getComments: () => Promise<Array<CommentModel>>
): UseComments => {
  const [comments, setComments] = useState(initialState);
  const { profile, isLoading } = useSession();
  const prevUid = useRef(profile?.uid);

  const fetchComments = async () => {
    const result = await getComments();
    setComments(result);
  };

  useEffect(() => {
    if (isLoading) return;

    if (profile?.uid != prevUid.current) fetchComments();

    prevUid.current = profile?.uid;
  }, [profile?.uid, isLoading]);

  const onVoteUp = async (commentId: string) => {
    await addCommentVoteUp(commentId);
  };

  const onVoteDown = async (commentId: string) => {
    await addCommentVoteDown(commentId);
  };

  const onVoteRemove = async (commentId: string) => {
    await removeCommentVote(commentId);
  };

  return {
    comments: comments,
    setComments: setComments,
    voteDown: onVoteDown,
    voteRemove: onVoteRemove,
    voteUp: onVoteUp
  };
};
