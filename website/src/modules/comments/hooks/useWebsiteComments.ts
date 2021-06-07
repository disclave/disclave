import { CommentModel, createComment, getComments, UrlId } from '@disclave/client';
import { useComments } from '@/modules/comments/hooks/useComments'
import { useEffect } from 'react';

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
  urlId: UrlId | null,
  rawUrl: string,
): UseWebsiteComments => {
  const fetchComments = async () => {
    if (!urlId) return [];
    return await getComments(urlId, true);
  };

  const { comments, setComments, voteDown, voteRemove, voteUp, refresh } = useComments(
    initialState,
    fetchComments
  );

  useEffect(() => {
    if (!urlId) return;
    refresh();
  }, [urlId])

  const addComment: AddComment = async (text: string) => {
    const addedComment = await createComment(text, urlId, rawUrl);
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
