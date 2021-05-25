import { Page, PageDetails } from "./models";
import { UserId } from "@/modules/auth";

export type { Page, PageDetails };

export abstract class PageService {
  abstract getTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number
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
