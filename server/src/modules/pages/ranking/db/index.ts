import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";
import { RankingPageEntity } from "./entity";

export type { RankingPageEntity };

export abstract class PageRankingRepository<
  T = unknown
> extends BaseRepository<T> {
  abstract findTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<RankingPageEntity>>;

  abstract findTopRatedPages(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<RankingPageEntity>>;
}
