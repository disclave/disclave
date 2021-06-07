import { Page, PageDetails, UrlId } from "./models";
import { UserId } from "@/modules/auth";

export type { Page, PageDetails, UrlId };

export interface UrlPageId {
  websiteId: string;
  pageId: string;
}

export abstract class PageService {
  abstract getPageData(url: string): Promise<UrlPageId>;

  abstract getTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Page>>;

  abstract getTopRatedPages(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Page>>;

  abstract getPageDetails(
    url: string,
    fetchMetaIfNoCache: boolean,
    userId: UserId | null
  ): Promise<PageDetails>;
}
