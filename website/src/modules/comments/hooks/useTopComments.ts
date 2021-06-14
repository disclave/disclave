import { RankingCommentModel, getTopCommentsRanking } from '@disclave/client';
import { useComments } from '@/modules/comments/hooks/useComments';

type VoteDown = (commentId: string) => Promise<void>;
type VoteRemove = (commentId: string) => Promise<void>;
type VoteUp = (commentId: string) => Promise<void>;
type UseTopComments = {
  comments: RankingCommentModel[];
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const useTopComments = (
  initialState: Array<RankingCommentModel>,
  minVoteSum: number,
  limit: number
): UseTopComments => {
  const fetchComments = async () => {
    return await getTopCommentsRanking(minVoteSum, limit, true);
  };

  const { comments, voteDown, voteUp, voteRemove } = useComments(
    initialState,
    false,
    fetchComments
  );

  return {
    comments: comments,
    voteDown,
    voteUp,
    voteRemove
  };
};
