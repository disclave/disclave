import { runQuery } from "../../../graphql";
import {
  RankingPageModel,
  TopCommentedPageRankingParams,
  TopRatedPageRankingParams,
} from "./models";
import { GET_TOP_COMMENTED_PAGES, GET_TOP_RATED_PAGES } from "./schemas";

export async function getTopCommentedPages(
  params: TopCommentedPageRankingParams,
  noCache: boolean = false
): Promise<Array<RankingPageModel>> {
  const result = await runQuery<Array<RankingPageModel>>(
    GET_TOP_COMMENTED_PAGES,
    {
      params,
    },
    "topCommentedPages",
    noCache
  );
  return result.map(responseToModel);
}

export async function getTopRatedPages(
  params: TopRatedPageRankingParams,
  noCache: boolean = false
): Promise<Array<RankingPageModel>> {
  const result = await runQuery<Array<RankingPageModel>>(
    GET_TOP_RATED_PAGES,
    {
      params,
    },
    "topRatedPages",
    noCache
  );
  return result.map(responseToModel);
}

function responseToModel(data: any): RankingPageModel {
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
