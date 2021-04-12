import { CommentModel, getComments, createComment } from '@disclave/client';
import { useComments } from '@/modules/comments/hooks/useComments';

type AddComment = (text: string) => Promise<void>;
type UseWebsiteComments = {
  comments: CommentModel[];
  addComment: AddComment;
};

export const useWebsiteComments = (
  initialState: Array<CommentModel>,
  website: string,
  serverSideUid: string | null
): UseWebsiteComments => {
  const fetchComments = async () => {
    return await getComments(website, true);
  };

  const { comments, setComments } = useComments(initialState, fetchComments, serverSideUid);

  const addComment: AddComment = async (text: string) => {
    const addedComment = await createComment(text, website);
    setComments([addedComment, ...comments]);
  };

  return {
    comments: comments,
    addComment: addComment
  };
};