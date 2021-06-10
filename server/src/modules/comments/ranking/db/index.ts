import { CommentEntity } from "@/modules/comments/comments/db/entity/CommentEntity";
import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";

export type { CommentEntity };

export abstract class CommentRankingRepository<
  T = unknown
> extends BaseRepository<T> {
  abstract findLatestComments(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<CommentEntity>>;

  abstract findTopComments(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<CommentEntity>>;
}
