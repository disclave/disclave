import { Resolvers } from "@/graphql";
import { getPageDetailsService, PageDetails } from "@disclave/services";

export const resolvers = (): Resolvers => {
  const service = getPageDetailsService();

  return {
    Query: {
      pageDetails: async (_, args: { url: string }, { decodedToken }) => {
        const pageDetails = await service.getPageDetails(
          args.url,
          decodedToken?.uid
        );
        return pageDetailsToResponse(pageDetails);
      },
    },
  };
};

function pageDetailsToResponse(details: PageDetails) {
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
}
