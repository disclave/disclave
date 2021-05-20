import { Page, PageDetails } from "./models";

export type { Page, PageDetails };

export abstract class PageService {
  abstract getTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number
  ): Promise<Array<Page>>;

  abstract getPageDetails(url: string): Promise<PageDetails>;
}
