import { Resolvers } from "@/graphql";
import { getPageRankingService, RankingPage } from "@disclave/services";

export const resolvers = (): Resolvers => {
  const service = getPageRankingService();

  return {
    Query: {
      topCommentedPages: async (
        _,
        args: {
          params: {
            limit: number;
            websiteId?: string;
            excludePageId?: string;
            commentsMinVoteSum: number;
          };
        },
        { decodedToken }
      ) => {
        const pages = await service.getTopCommentedPages(
          {
            limit: args.params.limit,
            websiteId: args.params.websiteId ?? null,
            excludePageId: args.params.excludePageId ?? null,
            commentsMinVoteSum: args.params.commentsMinVoteSum,
          },
          decodedToken?.uid
        );
        return pages.map(pageToResponse);
      },
      topRatedPages: async (
        _,
        args: {
          params: {
            limit: number;
            websiteId?: string;
            excludePageId?: string;
            commentsMinVoteSum: number;
            pageMinVoteSum: number;
          };
        },
        { decodedToken }
      ) => {
        const pages = await service.getTopRatedPages(
          {
            limit: args.params.limit,
            websiteId: args.params.websiteId ?? null,
            excludePageId: args.params.excludePageId ?? null,
            commentsMinVoteSum: args.params.commentsMinVoteSum,
            pageMinVoteSum: args.params.pageMinVoteSum,
          },
          decodedToken?.uid
        );
        return pages.map(pageToResponse);
      },
    },
  };
};

function pageToResponse(page: RankingPage) {
  return {
    id: page.id,
    websiteId: page.websiteId,
    pageId: page.pageId,
    commentsCount: page.commentsCount,
    url: page.url,
    meta: page.meta
      ? {
          logo: page.meta.logo,
          title: page.meta.title,
        }
      : null,
    votes: {
      sum: page.votes.sum,
      votedDown: page.votes.votedDown,
      votedUp: page.votes.votedUp,
    },
  };
}
