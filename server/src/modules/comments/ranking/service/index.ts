import { Comment } from "@/modules/comments/comments";
import { UserId } from "@/modules/auth";

export abstract class CommentRankingService {
  abstract getLatestComments(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Comment>>;

  abstract getTopComments(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Comment>>;
}
