import { PageCommentModel, createPageComment, getPageComments, UrlId } from '@disclave/client';
import { useComments } from '@/modules/comments/hooks/useComments';

type AddComment = (text: string) => Promise<void>;
type VoteDown = (commentId: string) => Promise<void>;
type VoteRemove = (commentId: string) => Promise<void>;
type VoteUp = (commentId: string) => Promise<void>;
type UseWebsiteComments = {
  comments: PageCommentModel[];
  addComment: AddComment;
  voteDown: VoteDown;
  voteRemove: VoteRemove;
  voteUp: VoteUp;
};

export const useWebsiteComments = (
  initialState: Array<PageCommentModel>,
  urlId: UrlId | null,
  rawUrl: string
): UseWebsiteComments => {
  const fetchComments = async () => {
    if (!urlId) return [];
    return await getPageComments(urlId, true);
  };

  const { comments, setComments, voteDown, voteRemove, voteUp } = useComments(
    initialState,
    urlId == null,
    fetchComments
  );

  const addComment: AddComment = async (text: string) => {
    if (!urlId) throw new Error('UrlId is required to add new comment');

    const addedComment = await createPageComment(text, urlId, rawUrl);
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
