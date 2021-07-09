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
  pageDetails: PageDetailsModel | null;
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
  const [pageDetails, setPageDetails] = useState<PageDetailsModel | null>(null);
  const [urlId, setUrlId] = useState<UrlId | null>(null);
  const activeTab = useActiveTab();

  const url = (): string => {
    if (!activeTab || !activeTab.url) throw "Active tab or url is null";
    return activeTab.url;
  };

  const fetchPageDetails = async (noCache: boolean = false) => {
    if (!activeTab?.url || authPending) return;

    try {
      const result = await getPageDetails(url(), noCache);
      setPageDetails(result);
      setUrlId({
        websiteId: result.websiteId,
        pageId: result.pageId,
      });
    } catch (e) {
      console.error(`usePageDetails - fetchPageDetails for url ${url()}`, e);
      // TODO: add errors handling
      throw e;
    }
  };

  const addVoteUp = async () => {
    if (!urlId) throw new Error("UrlId is missing");
    await addPageVoteUp(urlId);
    await fetchPageDetails(true);
  };

  const addVoteDown = async () => {
    if (!urlId) throw new Error("UrlId is missing");
    await addPageVoteDown(urlId);
    await fetchPageDetails(true);
  };

  const removeVote = async () => {
    if (!urlId) throw new Error("UrlId is missing");
    await removePageVote(urlId);
    await fetchPageDetails(true);
  };

  useEffect(() => {
    fetchPageDetails();
  }, [activeTab?.url]);

  useEffect(() => {
    fetchPageDetails(true);
  }, [user?.uid, authPending]);

  return {
    urlId: urlId,
    pageDetails: pageDetails,
    pageActions: {
      addVoteUp: addVoteUp,
      addVoteDown: addVoteDown,
      removeVote: removeVote,
    },
  };
};
