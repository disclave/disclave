import { RankingCommentEntity } from "./entity";
import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";

export type { RankingCommentEntity };

export abstract class CommentRankingRepository<
  T = unknown
> extends BaseRepository<T> {
  abstract findLatestComments(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<RankingCommentEntity>>;

  abstract findTopComments(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<RankingCommentEntity>>;
}
