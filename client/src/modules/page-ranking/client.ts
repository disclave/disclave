import { runQuery } from "../../graphql";
import { PageModel } from "./models";
import { GET_TOP_COMMENTED_PAGES, GET_TOP_RATED_PAGES } from "./schemas";

export async function getTopCommentedPages(
  minCommentsVoteSum: number,
  limit: number,
  noCache: boolean = false
): Promise<Array<PageModel>> {
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
}

export async function getTopRatedPages(
  minVoteSum: number,
  limit: number,
  noCache: boolean = false
): Promise<Array<PageModel>> {
  const result = await runQuery<Array<PageModel>>(
    GET_TOP_RATED_PAGES,
    {
      minVoteSum,
      limit,
    },
    "topRatedPages",
    noCache
  );
  return result.map(responseToModel);
}

function responseToModel(data: any): PageModel {
  return {
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
  };
}
