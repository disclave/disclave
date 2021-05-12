import { Page } from "./models";
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
