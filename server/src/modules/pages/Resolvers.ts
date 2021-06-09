import { PageDetails } from "./models";
import { container } from "@/inversify.config";
import { PageService } from "./index";
import { DecodedIdToken } from "@/modules/auth";

const service = container.get(PageService);

export const pagesResolvers = {
  Query: {
    pageDetails: async (
      _,
      args,
      { decodedToken }: { decodedToken: DecodedIdToken }
    ) => {
      const pageDetails = await service.getPageDetails(
        args.url,
        decodedToken?.uid
      );
      return pageDetailsToResponse(pageDetails);
    },
  },
};

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
