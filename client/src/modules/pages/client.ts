import { runQuery } from "../../graphql";
import { PageModel } from "./";
import {
  GET_TOP_COMMENTED_PAGES,
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

const responseToModel = (data: any): PageModel => {
  return {
    id: data.id,
    websiteId: data.websiteId,
    pageId: data.pageId,
    commentsCount: data.commentsCount
  };
};
