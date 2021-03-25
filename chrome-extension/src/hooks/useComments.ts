import { useEffect, useState } from "react";
import { getComments, createComment, CommentModel } from "@disclave/client";
import { useActiveTab } from "./";

type CommentsState = Array<CommentModel> | undefined;
type AddComment = (text: string) => Promise<void>;
type UseComments = [CommentsState, AddComment];

export const useComments = (): UseComments => {
  const [comments, setComments] = useState<CommentsState>(undefined);
  const activeTab = useActiveTab();

  const url = (): string => {
    if (!activeTab || !activeTab.url) throw "Active tab or url is null";
    return activeTab.url;
  };

  const fetchComments = async () => {
    // TODO: add errors handling
    const result = await getComments(url());
    setComments(result);
  };

  const addComment = async (text: string) => {
    // TODO: add errors handling
    const addedComment = await createComment(text, url());
    if (!comments) setComments([addedComment]);
    else setComments([addedComment, ...comments]);
  };

  useEffect(() => {
    if (!activeTab?.url) return;

    fetchComments();
  }, [activeTab?.url]);

  return [comments, addComment];
};
