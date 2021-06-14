import {
  RankingPage,
  PageRankingService,
} from "@/modules/pages/ranking/service";
import { container } from "@/inversify.config";
import { DecodedIdToken } from "@/modules/auth";

export const resolvers = () => {
  const service = container.get(PageRankingService);

  return {
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
