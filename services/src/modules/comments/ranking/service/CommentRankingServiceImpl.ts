import {
  CommentRankingRepository,
  RankingCommentEntity,
} from "@/modules/comments/ranking/db";
import { CommentRankingService, RankingComment } from "./index";
import { inject, injectable } from "inversify";
import { UserId } from "@/modules/auth";

@injectable()
export class CommentRankingServiceImpl implements CommentRankingService {
  @inject(CommentRankingRepository)
  private repository!: CommentRankingRepository;

  public async getLatestComments(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<RankingComment>> {
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
  ): Promise<Array<RankingComment>> {
    const comments = await this.repository.findTopComments(
      minVoteSum,
      limit,
      userId
    );
    return comments.map(toDomain);
  }
}

function toDomain(entity: RankingCommentEntity): RankingComment {
  return {
    id: entity.id,
    text: entity.text,
    author: {
      name: entity.author.name,
    },
    votes: {
      sum: entity.votes.sum,
      votedUp: entity.votes.votedUp,
      votedDown: entity.votes.votedDown,
    },
    timestamp: entity.timestamp,
    page: {
      websiteId: entity.page.websiteId,
      pageId: entity.page.pageId,
      meta: entity.page.meta
        ? {
            logo: entity.page.meta.logo ?? null,
            title: entity.page.meta.title ?? null,
          }
        : null,
    },
  };
}
