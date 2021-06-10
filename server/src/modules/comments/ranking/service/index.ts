import { RankingComment } from "./models";
import { UserId } from "@/modules/auth";

export type { RankingComment };

export abstract class CommentRankingService {
  abstract getLatestComments(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<RankingComment>>;

  abstract getTopComments(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<RankingComment>>;
}
