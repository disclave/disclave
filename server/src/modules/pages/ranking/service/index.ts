import { RankingPage } from "./models";
import { UserId } from "@/modules/auth";

export type { RankingPage };

export abstract class PageRankingService {
  abstract getTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<RankingPage>>;

  abstract getTopRatedPages(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<RankingPage>>;
}
