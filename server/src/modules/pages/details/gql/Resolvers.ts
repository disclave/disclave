import { PageDetails } from "@/modules/pages/details";
import { container } from "@/inversify.config";
import { PageDetailsService } from "@/modules/pages/details/service";
import { DecodedIdToken } from "@/modules/auth";

export const resolvers = () => {
  const service = container.get(PageDetailsService);

  return {
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
