import { CommentEntity } from "@/modules/comments/db/CommentEntity";
import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";

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
