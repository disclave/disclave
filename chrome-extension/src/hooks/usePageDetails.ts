import { useEffect, useState } from "react";
import {
  addPageVoteDown,
  addPageVoteUp,
  getPageDetails,
  PageDetailsModel,
  removePageVote,
  UserModel,
} from "@disclave/client";
import { useActiveTab } from "./";

type AddVoteUp = () => Promise<void>;
type AddVoteDown = () => Promise<void>;
type RemoveVote = () => Promise<void>;
type UsePageDetails = {
  pageDetails: PageDetailsModel | undefined;
  addVoteUp: AddVoteUp;
  addVoteDown: AddVoteDown;
  removeVote: RemoveVote;
};

export const usePageDetails = (
  user: UserModel | null,
  authPending: boolean
): UsePageDetails => {
  const [pageDetails, setPageDetails] = useState<PageDetailsModel>(undefined);
  const activeTab = useActiveTab();

  const url = (): string => {
    if (!activeTab || !activeTab.url) throw "Active tab or url is null";
    return activeTab.url;
  };

  const fetchPageDetails = async (noCache: boolean = false) => {
    if (!activeTab?.url || authPending) return;

    // TODO: add errors handling
    const result = await getPageDetails(url(), false, noCache);
    setPageDetails(result);
  };

  const addVoteUp = async () => {
    await addPageVoteUp(url());
  };

  const addVoteDown = async () => {
    await addPageVoteDown(url());
  };

  const removeVote = async () => {
    await removePageVote(url());
  };

  useEffect(() => {
    fetchPageDetails();
  }, [activeTab?.url]);

  useEffect(() => {
    fetchPageDetails(true);
  }, [user?.uid, authPending]);

  return {
    pageDetails: pageDetails,
    addVoteUp: addVoteUp,
    addVoteDown: addVoteDown,
    removeVote: removeVote,
  };
};
