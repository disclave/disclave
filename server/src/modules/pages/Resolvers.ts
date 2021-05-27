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
  Mutation: {
    removePageVote: async (_, args, { idToken }: { idToken: IdToken }) => {
      if (!idToken) throw Unauthorized("You have to be authorized to vote.");
      const decodedToken = await authProvider.verifyIdToken(idToken, true);
      return await service.removeVote(args.url, decodedToken.uid);
    },
    addPageVoteUp: async (_, args, { idToken }: { idToken: IdToken }) => {
      if (!idToken) throw Unauthorized("You have to be authorized to vote.");
      const decodedToken = await authProvider.verifyIdToken(idToken, true);
      return await service.setVoteUp(args.url, decodedToken.uid);
    },
    addPageVoteDown: async (_, args, { idToken }: { idToken: IdToken }) => {
      if (!idToken) throw Unauthorized("You have to be authorized to vote.");
      const decodedToken = await authProvider.verifyIdToken(idToken, true);
      return await service.setVoteDown(args.url, decodedToken.uid);
    },
  },
};

const pageToResponse = (page: Page) => {
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
};

const pageDetailsToResponse = (details: PageDetails) => {
  return {
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
  };
};
