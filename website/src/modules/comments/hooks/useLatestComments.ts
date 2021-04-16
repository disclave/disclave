import { CommentModel } from '@disclave/client';
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

export const useLatestComments = (initialState: Array<CommentModel>): UseLatestComments => {
  const { comments, voteUp, voteDown, voteRemove } = useComments(initialState);

  return {
    comments: comments,
    voteUp,
    voteDown,
    voteRemove
  };
};
