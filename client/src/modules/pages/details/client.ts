import { runQuery } from "../../../graphql";
import { PageDetailsModel } from "./models";
import { GET_PAGE_DETAILS } from "./schemas";

export async function getPageDetails(
  url: string,
  noCache: boolean = false
): Promise<PageDetailsModel> {
  const result = await runQuery<PageDetailsModel>(
    GET_PAGE_DETAILS,
    {
      url,
    },
    "pageDetails",
    noCache
  );
  return responseToModel(result);
}

function responseToModel(data: any): PageDetailsModel {
  return {
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
  };
}
