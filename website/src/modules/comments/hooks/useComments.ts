import { useState, useEffect, useRef } from 'react';
import {
  addCommentVoteDown,
  addCommentVoteUp,
  removeCommentVote,
  useSession
} from '@disclave/client';

type SetComments<T> = (data: Array<T>) => void;
type VoteDown = (commentId: string) => Promise<void>;
type VoteRemove = (commentId: string) => Promise<void>;
type VoteUp = (commentId: string) => Promise<void>;
type UseComments<T> = {
  comments: Array<T>;
  setComments: SetComments<T>;
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const useComments = <T>(
  initialState: Array<T>,
  loading: boolean,
  getComments: () => Promise<Array<T>>
): UseComments<T> => {
  const [comments, setComments] = useState(initialState);
  const { uid } = useSession();
  const prevUid = useRef(uid);
  const prevLoading = useRef(loading);

  const fetchComments = async () => {
    const result = await getComments();
    setComments(result);
  };

  useEffect(() => {
    if (loading) return;

    if (uid != prevUid.current || prevLoading.current) fetchComments();

    prevUid.current = uid;
    prevLoading.current = loading;
  }, [uid, loading]);

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
