import { CommentModel, getLatestComments } from '@disclave/client';
import { useComments } from '@/modules/comments/hooks/useComments';

type UseLatestComments = {
  comments: CommentModel[];
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

  const { comments } = useComments(initialState, fetchComments, serverSideUid);

  return {
    comments: comments
  };
};
