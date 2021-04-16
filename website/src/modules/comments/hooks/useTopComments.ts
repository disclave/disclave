import { CommentModel } from '@disclave/client';
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

export const useTopComments = (initialState: Array<CommentModel>): UseTopComments => {
  const { comments, voteDown, voteUp, voteRemove } = useComments(initialState);

  return {
    comments: comments,
    voteDown,
    voteUp,
    voteRemove
  };
};
