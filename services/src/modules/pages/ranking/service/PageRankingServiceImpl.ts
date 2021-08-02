import { RankingPageEntity, PageRankingRepository } from "../db";
import {
  RankingPage,
  PageRankingService,
  TopCommentedConfig,
  TopRatedConfig,
} from "./index";
import { inject, injectable } from "inversify";
import { UserId } from "@/modules/auth";

@injectable()
export class PageRankingServiceImpl implements PageRankingService {
  @inject(PageRankingRepository)
  private repository!: PageRankingRepository;

  public async getTopCommentedPages(
    config: TopCommentedConfig,
    userId: UserId | null
  ): Promise<Array<RankingPage>> {
    const pages = await this.repository.findTopCommentedPages(
      {
        limit: config.limit,
        websiteId: config.websiteId,
        excludePageId: config.excludePageId,
        commentsMinVoteSum: config.commentsMinVoteSum,
      },
      userId
    );
    return pages.map(toDomain);
  }

  public async getTopRatedPages(
    config: TopRatedConfig,
    userId: UserId | null
  ): Promise<Array<RankingPage>> {
    const pages = await this.repository.findTopRatedPages(
      {
        limit: config.limit,
        websiteId: config.websiteId,
        excludePageId: config.excludePageId,
        commentsMinVoteSum: config.commentsMinVoteSum,
        pageMinVoteSum: config.pageMinVoteSum,
      },
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
