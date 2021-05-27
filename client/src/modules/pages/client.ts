import { client, runQuery } from "../../graphql";
import { PageDetailsModel, PageModel } from "./models";
import {
  ADD_PAGE_VOTE_DOWN,
  ADD_PAGE_VOTE_UP,
  GET_PAGE_DETAILS,
  GET_TOP_COMMENTED_PAGES,
  REMOVE_PAGE_VOTE,
} from "./schemas";

export const getTopCommentedPages = async (
  minCommentsVoteSum: number,
  limit: number,
  noCache: boolean = false
): Promise<Array<PageModel>> => {
  const result = await runQuery<Array<PageModel>>(
    GET_TOP_COMMENTED_PAGES,
    {
      minCommentsVoteSum,
      limit,
    },
    "topCommentedPages",
    noCache
  );
  return result.map(responseToModel);
};

export const getPageDetails = async (
  url: string,
  fetchMetaIfNoCache: boolean,
  noCache: boolean = false
): Promise<PageDetailsModel> => {
  const result = await runQuery<PageDetailsModel>(
    GET_PAGE_DETAILS,
    {
      url,
      fetchMetaIfNoCache,
    },
    "pageDetails",
    noCache
  );
  return responseToDetailsModel(result);
};

export const removePageVote = async (url: string): Promise<boolean> => {
  const result = await client().mutate({
    mutation: REMOVE_PAGE_VOTE,
    variables: {
      url: url,
    },
  });
  return result.data.removePageVote;
};

export const addPageVoteUp = async (url: string): Promise<boolean> => {
  const result = await client().mutate({
    mutation: ADD_PAGE_VOTE_UP,
    variables: {
      url: url,
    },
  });
  return result.data.addPageVoteUp;
};

export const addPageVoteDown = async (url: string): Promise<boolean> => {
  const result = await client().mutate({
    mutation: ADD_PAGE_VOTE_DOWN,
    variables: {
      url: url,
    },
  });
  return result.data.addPageVoteDown;
};

const responseToModel = (data: any): PageModel => ({
  id: data.id,
  websiteId: data.websiteId,
  pageId: data.pageId,
  commentsCount: data.commentsCount,
  url: data.url,
  meta: data.meta
    ? {
        logo: data.meta.logo,
        title: data.meta.title,
      }
    : null,
  votes: {
    sum: data.votes.sum,
    votedUp: data.votes.votedUp,
    votedDown: data.votes.votedDown,
  },
});

const responseToDetailsModel = (data: any): PageDetailsModel => ({
  url: data.url,
  pageId: data.pageId,
  websiteId: data.websiteId,
  votes: {
    sum: data.votes.sum,
    votedUp: data.votes.votedUp,
    votedDown: data.votes.votedDown,
  },
  meta: data.meta
    ? {
        logo: data.meta.logo,
        title: data.meta.title,
      }
    : null,
});
