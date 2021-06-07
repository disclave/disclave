import { Page, PageDetails } from "./models";
import { container } from "@/inversify.config";
import { PageService } from "./index";
import { AuthProvider, DecodedIdToken, IdToken } from "@/modules/auth";
import { Unauthorized } from "@/exceptions/exceptions";

const authProvider = container.get(AuthProvider);
const service = container.get(PageService);

export const pagesResolvers = {
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
    pageDetails: async (
      _,
      args,
      { decodedToken }: { decodedToken: DecodedIdToken }
    ) => {
      const pageDetails = await service.getPageDetails(
        args.url,
        args.fetchMetaIfNoCache,
        decodedToken?.uid
      );
      return pageDetailsToResponse(pageDetails);
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

const pageDetailsToResponse = (details: PageDetails) => ({
  url: details.url,
  pageId: details.pageId,
  websiteId: details.websiteId,
  votes: {
    sum: details.votes.sum,
    votedUp: details.votes.votedUp,
    votedDown: details.votes.votedDown,
  },
  meta: details.meta
    ? {
        logo: details.meta.logo,
        title: details.meta.title,
      }
    : null,
});
