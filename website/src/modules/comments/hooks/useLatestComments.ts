import { RankingCommentModel, getLatestCommentsRanking } from '@disclave/client';
import { useComments } from '@/modules/comments/hooks/useComments';

type VoteDown = (commentId: string) => Promise<void>;
type VoteRemove = (commentId: string) => Promise<void>;
type VoteUp = (commentId: string) => Promise<void>;
type UseLatestComments = {
  comments: RankingCommentModel[];
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const useLatestComments = (
  initialState: Array<RankingCommentModel>,
  minVoteSum: number,
  limit: number
): UseLatestComments => {
  const fetchComments = async () => {
    return await getLatestCommentsRanking(minVoteSum, limit, true);
  };

  const { comments, voteUp, voteDown, voteRemove } = useComments(
    initialState,
    false,
    fetchComments
  );

  return {
    comments: comments,
    voteUp,
    voteDown,
    voteRemove
  };
};
