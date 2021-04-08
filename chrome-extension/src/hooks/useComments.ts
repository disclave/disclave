import { useEffect, useState } from "react";
import {
  getComments,
  createComment,
  CommentModel,
  addCommentVoteUp,
  addCommentVoteDown,
  removeCommentVote,
  UserProfileModel,
} from "@disclave/client";
import { useActiveTab } from "./";

type CommentsState = Array<CommentModel> | undefined;
type AddComment = (text: string) => Promise<void>;
type AddVoteUp = (commentId: string) => Promise<void>;
type AddVoteDown = (commentId: string) => Promise<void>;
type RemoveVote = (commentId: string) => Promise<void>;
type UseComments = {
  comments: CommentsState;
  addComment: AddComment;
  addVoteUp: AddVoteUp;
  addVoteDown: AddVoteDown;
  removeVote: RemoveVote;
};

export const useComments = (
  userProfile: UserProfileModel | null,
  authPending: boolean
): UseComments => {
  const [comments, setComments] = useState<CommentsState>(undefined);
  const activeTab = useActiveTab();

  const url = (): string => {
    if (!activeTab || !activeTab.url) throw "Active tab or url is null";
    return activeTab.url;
  };

  const fetchComments = async (noCache: boolean = false) => {
    if (!activeTab?.url || authPending) return;

    // TODO: add errors handling
    const result = await getComments(url(), noCache);
    setComments(result);
  };

  const addComment = async (text: string) => {
    // TODO: add errors handling
    const addedComment = await createComment(text, url());
    if (!comments) setComments([addedComment]);
    else setComments([addedComment, ...comments]);
  };

  const addVoteUp = async (commentId: string) => {
    await addCommentVoteUp(commentId);
  };

  const addVoteDown = async (commentId: string) => {
    await addCommentVoteDown(commentId);
  };

  const removeVote = async (commentId: string) => {
    await removeCommentVote(commentId);
  };

  useEffect(() => {
    fetchComments();
  }, [activeTab?.url]);

  useEffect(() => {
    fetchComments(true);
  }, [userProfile?.uid, authPending]);

  return {
    comments: comments,
    addComment: addComment,
    addVoteUp: addVoteUp,
    addVoteDown: addVoteDown,
    removeVote: removeVote,
  };
};
