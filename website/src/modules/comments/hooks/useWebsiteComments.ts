import { CommentModel, createComment, getComments } from '@disclave/client';
import { useComments } from '@/modules/comments/hooks/useComments';

type AddComment = (text: string) => Promise<void>;
type VoteDown = (commentId: string) => Promise<void>;
type VoteRemove = (commentId: string) => Promise<void>;
type VoteUp = (commentId: string) => Promise<void>;
type UseWebsiteComments = {
  comments: CommentModel[];
  addComment: AddComment;
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const useWebsiteComments = (
  initialState: Array<CommentModel>,
  websiteId: string,
  pageId: string,
  rawUrl: string,
): UseWebsiteComments => {
  const fetchComments = async () => {
    return await getComments(websiteId, pageId, true);
  };

  const { comments, setComments, voteDown, voteRemove, voteUp } = useComments(
    initialState,
    fetchComments
  );

  const addComment: AddComment = async (text: string) => {
    const addedComment = await createComment(text, websiteId, pageId, rawUrl);
    setComments([addedComment, ...comments]);
  };

  return {
    comments: comments,
    addComment: addComment,
    voteDown,
    voteRemove,
    voteUp
  };
};
