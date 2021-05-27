import { PageDetailsEntity, PageEntity, PageRepository } from "./db";
import { PageService, Page, PageDetails } from "./index";
import { inject, injectable } from "inversify";
import { ParsedUrlData, UrlService } from "@/modules/url";
import { ImageService } from "@/modules/image";
import { UserId } from "@/modules/auth";

@injectable()
export class PageServiceImpl implements PageService {
  @inject(PageRepository)
  private repository: PageRepository;

  @inject(UrlService)
  private urlService: UrlService;

  @inject(ImageService)
  private imageService: ImageService;

  public async getTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Page>> {
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
  ): Promise<Array<PageDetails>> {
    const pages = await this.repository.findTopRatedPages(
      minVoteSum,
      limit,
      userId
    );
    return pages.map(detailsToDomain);
  }

  public async getPageDetails(
    url: string,
    fetchMetaIfNoCache: boolean,
    userId: UserId | null
  ): Promise<PageDetails> {
    const parsedUrl = this.urlService.parseUrl(url);
    const savedPageDetails = await this.repository.findOrCreatePageDetails(
      {
        pageId: parsedUrl.pageId,
        websiteId: parsedUrl.websiteId,
        normalized: parsedUrl.normalized,
      },
      userId
    );

    if (!!savedPageDetails.meta || !fetchMetaIfNoCache)
      return detailsToDomain(savedPageDetails);

    const updatedPageDetails = await this.scrapAndSavePageDetails(
      parsedUrl,
      userId
    );

    if (!updatedPageDetails) return detailsToDomain(savedPageDetails);
    else return detailsToDomain(updatedPageDetails);
  }

  public async setVoteUp(url: string, userId: UserId): Promise<boolean> {
    const parsedUrl = this.urlService.parseUrl(url);
    return await this.repository.setVoteUp(
      {
        pageId: parsedUrl.pageId,
        websiteId: parsedUrl.websiteId,
        normalized: parsedUrl.normalized,
      },
      userId
    );
  }

  public async setVoteDown(url: string, userId: UserId): Promise<boolean> {
    const parsedUrl = this.urlService.parseUrl(url);
    return await this.repository.setVoteDown(
      {
        pageId: parsedUrl.pageId,
        websiteId: parsedUrl.websiteId,
        normalized: parsedUrl.normalized,
      },
      userId
    );
  }

  public async removeVote(url: string, userId: UserId): Promise<boolean> {
    const parsedUrl = this.urlService.parseUrl(url);
    return await this.repository.removeVote(
      {
        pageId: parsedUrl.pageId,
        websiteId: parsedUrl.websiteId,
        normalized: parsedUrl.normalized,
      },
      userId
    );
  }

  private async scrapAndSavePageDetails(
    url: ParsedUrlData,
    userId: UserId | null
  ): Promise<PageDetailsEntity | null> {
    const metadata = await this.urlService.scrapUrl(url.normalized);
    if (!metadata) return null;

    const title = metadata.title;
    const logo = await this.imageService.savePageLogo(url, metadata.logo);

    return await this.repository.updatePageDetails(
      {
        pageId: url.pageId,
        websiteId: url.websiteId,
        normalized: url.normalized,
      },
      { logo, title },
      userId
    );
  }
}
const toDomain = (entity: PageEntity): Page => {
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
};

const detailsToDomain = (entity: PageDetailsEntity): PageDetails => {
  return {
    url: entity.url,
    pageId: entity.pageId,
    websiteId: entity.websiteId,
    votes: {
      sum: entity.votes.sum,
      votedDown: entity.votes.votedDown,
      votedUp: entity.votes.votedUp,
    },
    meta: entity.meta
      ? {
          logo: entity.meta.logo,
          title: entity.meta.title,
        }
      : null,
  };
};
