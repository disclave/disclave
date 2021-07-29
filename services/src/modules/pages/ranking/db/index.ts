import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";
import { RankingPageEntity } from "./entity";

export type { RankingPageEntity };

interface RankingParams {
  limit: number;
  websiteId: string | null;
  excludePageId: string | null;
}

export interface TopCommentedParams extends RankingParams {
  commentsMinVoteSum: number;
}

export interface TopRatedParams extends RankingParams {
  pageMinVoteSum: number;
  commentsMinVoteSum: number;
}

export abstract class PageRankingRepository<
  T = unknown
> extends BaseRepository<T> {
  abstract findTopCommentedPages(
    params: TopCommentedParams,
    uid: UserId | null
  ): Promise<Array<RankingPageEntity>>;

  abstract findTopRatedPages(
    params: TopRatedParams,
    uid: UserId | null
  ): Promise<Array<RankingPageEntity>>;
}
