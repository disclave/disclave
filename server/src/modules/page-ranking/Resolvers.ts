import { Page } from "./models";
import { container } from "@/inversify.config";
import { DecodedIdToken } from "@/modules/auth";
import { PageRankingService } from ".";

const service = container.get(PageRankingService);

export const pageRankingResolvers = {
  Query: {
    topCommentedPages: async (
      _,
      args,
      { decodedToken }: { decodedToken: DecodedIdToken }
    ) => {
      const pages = await service.getTopCommentedPages(
        args.minCommentsVoteSum,
        args.limit,
        decodedToken?.uid
      );
      return pages.map(pageToResponse);
    },
    topRatedPages: async (
      _,
      args,
      { decodedToken }: { decodedToken: DecodedIdToken }
    ) => {
      const pages = await service.getTopRatedPages(
        args.minVoteSum,
        args.limit,
        decodedToken?.uid
      );
      return pages.map(pageToResponse);
    },
  },
};

const pageToResponse = (page: Page) => ({
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
});
