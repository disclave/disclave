import { CommentModel, getTopComments } from '@disclave/client';
import { useComments } from '@/modules/comments/hooks/useComments';

type VoteDown = (commentId: string) => Promise<void>;
type VoteRemove = (commentId: string) => Promise<void>;
type VoteUp = (commentId: string) => Promise<void>;
type UseTopComments = {
  comments: CommentModel[];
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const useTopComments = (
  initialState: Array<CommentModel>,
  minVoteSum: number,
  limit: number,
  serverSideUid: string | null
): UseTopComments => {
  const fetchComments = async () => {
    return await getTopComments(minVoteSum, limit, true);
  };

  const { comments, voteDown, voteUp, voteRemove } = useComments(
    initialState,
    fetchComments,
    serverSideUid
  );

  return {
    comments: comments,
    voteDown,
    voteUp,
    voteRemove
  };
};
