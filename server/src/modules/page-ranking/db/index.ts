import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";
import { PageEntity } from "./entity";

export type { PageEntity };

export abstract class PageRankingRepository<
  T = unknown
> extends BaseRepository<T> {
  abstract findTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<PageEntity>>;

  abstract findTopRatedPages(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<PageEntity>>;
}
