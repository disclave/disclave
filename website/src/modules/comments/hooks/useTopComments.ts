import { CommentModel, getTopComments } from '@disclave/client';
import { useComments } from '@/modules/comments/hooks/useComments';

type UseTopComments = {
  comments: CommentModel[];
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

  const { comments } = useComments(initialState, fetchComments, serverSideUid);

  return {
    comments: comments
  };
};
