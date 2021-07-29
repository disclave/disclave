import { RankingPage } from "./models";
import { UserId } from "@/modules/auth";

export type { RankingPage };

export interface RankingConfig {
  limit: number;
  websiteId: string | null;
  excludePageId: string | null;
}

export interface TopCommentedConfig extends RankingConfig {
  commentsMinVoteSum: number;
}

export interface TopRatedConfig extends RankingConfig {
  pageMinVoteSum: number;
  commentsMinVoteSum: number;
}

export abstract class PageRankingService {
  abstract getTopCommentedPages(
    config: TopCommentedConfig,
    userId: UserId | null
  ): Promise<Array<RankingPage>>;

  abstract getTopRatedPages(
    config: TopRatedConfig,
    userId: UserId | null
  ): Promise<Array<RankingPage>>;
}
