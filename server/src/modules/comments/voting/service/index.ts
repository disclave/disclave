import { UserId } from "@/modules/auth";

export abstract class CommentVoteService {
  abstract setVoteUp(commentId: string, userId: UserId): Promise<boolean>;
  abstract setVoteDown(commentId: string, userId: UserId): Promise<boolean>;
  abstract removeVote(commentId: string, userId: UserId): Promise<boolean>;
}
