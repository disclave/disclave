import { PageDetails, UrlId } from "./models";
import { UserId } from "@/modules/auth";

export type { PageDetails, UrlId };

export interface UrlPageId {
  websiteId: string;
  pageId: string;
}

export abstract class PageService {
  abstract getPageData(url: string): Promise<UrlPageId>;

  abstract getPageDetails(
    url: string,
    fetchMetaIfNoCache: boolean,
    userId: UserId | null
  ): Promise<PageDetails>;
}
