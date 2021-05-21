import { runQuery } from "../../graphql";
import { PageDetailsModel, PageModel } from "./models";
import { GET_PAGE_DETAILS, GET_TOP_COMMENTED_PAGES } from "./schemas";

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

const responseToModel = (data: any): PageModel => ({
  id: data.id,
  websiteId: data.websiteId,
  pageId: data.pageId,
  commentsCount: data.commentsCount,
});

const responseToDetailsModel = (data: any): PageDetailsModel => ({
  url: data.url,
  pageId: data.pageId,
  websiteId: data.websiteId,
  meta: data.meta
    ? {
        logo: data.meta.logo,
        title: data.meta.title,
      }
    : null,
});
