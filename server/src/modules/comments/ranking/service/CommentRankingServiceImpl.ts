import {
  CommentRankingRepository,
  CommentEntity,
} from "@/modules/comments/ranking/db";
import { CommentRankingService } from "./index";
import { Comment } from "@/modules/comments/comments";
import { inject, injectable } from "inversify";
import { UserId } from "@/modules/auth";

@injectable()
export class CommentRankingServiceImpl implements CommentRankingService {
  @inject(CommentRankingRepository)
  private repository: CommentRankingRepository;

  public async getLatestComments(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Comment>> {
    const comments = await this.repository.findLatestComments(
      minVoteSum,
      limit,
      userId
    );
    return comments.map(toDomain);
  }

  public async getTopComments(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Comment>> {
    const comments = await this.repository.findTopComments(
      minVoteSum,
      limit,
      userId
    );
    return comments.map(toDomain);
  }
}

function toDomain(entity: CommentEntity): Comment {
  return {
    id: entity.id,
    text: entity.text,
    author: {
      id: entity.author.id,
      name: entity.author.name,
    },
    votes: {
      sum: entity.votes.sum,
      votedUp: entity.votes.votedUp,
      votedDown: entity.votes.votedDown,
    },
    timestamp: entity.timestamp,
    urlMeta: {
      websiteId: entity.url.websiteId,
      pageId: entity.url.pageId,
    },
  };
}
