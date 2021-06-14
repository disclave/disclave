import { runQuery } from "../../../graphql";
import { RankingCommentModel } from "./models";
import {
  GET_LATEST_COMMENTS_RANKING,
  GET_TOP_COMMENTS_RANKING,
} from "./schemas";

export async function getLatestCommentsRanking(
  minVoteSum: number,
  limit: number,
  noCache: boolean = false
): Promise<Array<RankingCommentModel>> {
  const result = await runQuery<Array<RankingCommentModel>>(
    GET_LATEST_COMMENTS_RANKING,
    {
      minVoteSum,
      limit,
    },
    "latestCommentsRanking",
    noCache
  );
  return result.map(responseToModel);
}

export async function getTopCommentsRanking(
  minVoteSum: number,
  limit: number,
  noCache: boolean = false
): Promise<Array<RankingCommentModel>> {
  const result = await runQuery<Array<RankingCommentModel>>(
    GET_TOP_COMMENTS_RANKING,
    {
      minVoteSum,
      limit,
    },
    "topCommentsRanking",
    noCache
  );
  return result.map(responseToModel);
}

function responseToModel(data: any): RankingCommentModel {
  return {
    id: data.id,
    text: data.text,
    author: {
      name: data.author.name,
    },
    votes: {
      sum: data.votes.sum,
      votedUp: data.votes.votedUp,
      votedDown: data.votes.votedDown,
    },
    timestamp: data.timestamp,
    page: {
      websiteId: data.page.websiteId,
      pageId: data.page.pageId,
      meta: data.page.meta
        ? {
            logo: data.page.meta.logo ?? null,
            title: data.page.meta.title ?? null,
          }
        : null,
    },
  };
}
