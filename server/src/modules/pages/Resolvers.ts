import { Page, PageDetails } from "./models";
import { container } from "@/inversify.config";
import { PageService } from "./index";

const service = container.get(PageService);

export const pagesResolvers = {
  Query: {
    topCommentedPages: async (_, args) => {
      const pages = await service.getTopCommentedPages(
        args.minCommentsVoteSum,
        args.limit
      );
      return pages.map(pageToResponse);
    },
    pageDetails: async (_, args) => {
      const pageDetails = await service.getPageDetails(
        args.url,
        args.fetchIfNoCache
      );
      return pageDetailsToResponse(pageDetails);
    },
  },
};

const pageToResponse = (page: Page) => {
  return {
    id: page.id,
    websiteId: page.websiteId,
    pageId: page.pageId,
    commentsCount: page.commentsCount,
  };
};

const pageDetailsToResponse = (details: PageDetails) => {
  return {
    url: details.url,
    pageId: details.pageId,
    websiteId: details.websiteId,
    icon: details.icon,
    title: details.title,
  };
};
