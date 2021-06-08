import { useEffect, useState } from "react";
import {
  addPageVoteDown,
  addPageVoteUp,
  getPageDetails,
  PageDetailsModel,
  removePageVote,
  UrlId,
  UserModel,
} from "@disclave/client";
import { useActiveTab } from "./";

type AddVoteUp = () => Promise<void>;
type AddVoteDown = () => Promise<void>;
type RemoveVote = () => Promise<void>;
type UsePageDetails = {
  urlId: UrlId | null;
  pageDetails: PageDetailsModel | undefined;
  pageActions: {
    addVoteUp: AddVoteUp;
    addVoteDown: AddVoteDown;
    removeVote: RemoveVote;
  };
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

  const urlId = (): UrlId => {
    if (!pageDetails) throw "Page details not fetched yet.";
    return {
      websiteId: pageDetails.websiteId,
      pageId: pageDetails.pageId,
    };
  };

  const fetchPageDetails = async (noCache: boolean = false) => {
    if (!activeTab?.url || authPending) return;

    try {
      const result = await getPageDetails(url(), noCache);
      setPageDetails(result);
    } catch (e) {
      console.error(`usePageDetails - fetchPageDetails for url ${url()}`, e);
      // TODO: add errors handling
      throw e;
    }
  };

  const addVoteUp = async () => {
    await addPageVoteUp(urlId());
    fetchPageDetails(true);
  };

  const addVoteDown = async () => {
    await addPageVoteDown(urlId());
    fetchPageDetails(true);
  };

  const removeVote = async () => {
    await removePageVote(urlId());
    fetchPageDetails(true);
  };

  useEffect(() => {
    fetchPageDetails();
  }, [activeTab?.url]);

  useEffect(() => {
    fetchPageDetails(true);
  }, [user?.uid, authPending]);

  return {
    urlId: pageDetails ? urlId() : null,
    pageDetails: pageDetails,
    pageActions: {
      addVoteUp: addVoteUp,
      addVoteDown: addVoteDown,
      removeVote: removeVote,
    },
  };
};
