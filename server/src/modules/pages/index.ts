import { Page } from "./models";

export type { Page };

export abstract class PageService {
  abstract getTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number
  ): Promise<Array<Page>>;
}
