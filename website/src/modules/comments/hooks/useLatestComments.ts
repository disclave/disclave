import { CommentModel, getLatestComments } from '@disclave/client';
import { useComments } from '@/modules/comments/hooks/useComments';

type VoteDown = (commentId: string) => Promise<void>;
type VoteRemove = (commentId: string) => Promise<void>;
type VoteUp = (commentId: string) => Promise<void>;
type UseLatestComments = {
  comments: CommentModel[];
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const useLatestComments = (
  initialState: Array<CommentModel>,
  minVoteSum: number,
  limit: number,
  serverSideUid: string | null
): UseLatestComments => {
  const fetchComments = async () => {
    return await getLatestComments(minVoteSum, limit, true);
  };

  const { comments, voteUp, voteDown, voteRemove } = useComments(
    initialState,
    fetchComments,
    serverSideUid
  );

  return {
    comments: comments,
    voteUp,
    voteDown,
    voteRemove
  };
};
