import { CommentVoteRepository } from "@/modules/comments/voting/db";
import { CommentVoteService } from "./index";
import { inject, injectable } from "inversify";
import { UserId } from "@/modules/auth";

@injectable()
export class CommentVoteServiceImpl implements CommentVoteService {
  @inject(CommentVoteRepository)
  private repository!: CommentVoteRepository;

  public async removeVote(commentId: string, userId: UserId): Promise<boolean> {
    return await this.repository.removeVote(commentId, userId);
  }

  public async setVoteDown(
    commentId: string,
    userId: UserId
  ): Promise<boolean> {
    return await this.repository.setVoteDown(commentId, userId);
  }

  public async setVoteUp(commentId: string, userId: UserId): Promise<boolean> {
    return await this.repository.setVoteUp(commentId, userId);
  }
}
