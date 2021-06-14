import { RankingPageEntity, PageRankingRepository } from "../db";
import { RankingPage, PageRankingService } from "./index";
import { inject, injectable } from "inversify";
import { UserId } from "@/modules/auth";

@injectable()
export class PageRankingServiceImpl implements PageRankingService {
  @inject(PageRankingRepository)
  private repository: PageRankingRepository;

  public async getTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<RankingPage>> {
    const pages = await this.repository.findTopCommentedPages(
      commentsMinVoteSum,
      limit,
      userId
    );
    return pages.map(toDomain);
  }

  public async getTopRatedPages(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<RankingPage>> {
    const pages = await this.repository.findTopRatedPages(
      minVoteSum,
      limit,
      userId
    );
    return pages.map(toDomain);
  }
}

function toDomain(entity: RankingPageEntity): RankingPage {
  return {
    id: entity.id,
    websiteId: entity.websiteId,
    pageId: entity.pageId,
    commentsCount: entity.commentsCount,
    url: entity.url,
    meta: entity.meta
      ? {
          logo: entity.meta.logo,
          title: entity.meta.title,
        }
      : null,
    votes: {
      sum: entity.votes.sum,
      votedDown: entity.votes.votedDown,
      votedUp: entity.votes.votedUp,
    },
  };
}
