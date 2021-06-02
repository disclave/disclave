import { Page, PageDetails } from "./models";
import { UserId } from "@/modules/auth";

export type { Page, PageDetails };

export interface PageData {
  websiteId: string;
  pageId: string;
  url: {
    raw: string;
    normalized: string;
  };
  meta: {
    logo: string | null;
    title: string | null;
  };
}

export abstract class PageService {
  abstract getPageData(url: string): Promise<PageData>;

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

  abstract setVoteUp(url: string, userId: UserId): Promise<boolean>;
  abstract setVoteDown(url: string, userId: UserId): Promise<boolean>;
  abstract removeVote(url: string, userId: UserId): Promise<boolean>;
}
