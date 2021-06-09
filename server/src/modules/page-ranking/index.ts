import { Page } from "./models";
import { UserId } from "@/modules/auth";

export type { Page };

export abstract class PageRankingService {
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
}
