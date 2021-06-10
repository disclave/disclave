import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";

export abstract class CommentVoteRepository<
  T = unknown
> extends BaseRepository<T> {
  abstract setVoteUp(commentId: string, uid: UserId): Promise<boolean>;
  abstract setVoteDown(commentId: string, uid: UserId): Promise<boolean>;
  abstract removeVote(commentId: string, uid: UserId): Promise<boolean>;
}
