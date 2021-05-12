import { PageEntity } from "./PageEntity";
import { BaseRepository } from "@/repository";

export type { PageEntity };

export abstract class PageRepository<T = unknown> extends BaseRepository<T> {
  abstract findTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number
  ): Promise<Array<PageEntity>>;
}
