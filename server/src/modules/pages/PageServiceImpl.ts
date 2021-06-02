import {
  PageConfigRepository,
  PageDetailsEntity,
  PageEntity,
  PageRepository,
} from "./db";
import { PageService, Page, PageDetails, PageData } from "./index";
import { inject, injectable } from "inversify";
import { ParsedUrlData, UrlMetaData, UrlService } from "@/modules/url";
import { ImageService } from "@/modules/image";
import { UserId } from "@/modules/auth";

@injectable()
export class PageServiceImpl implements PageService {
  @inject(PageRepository)
  private pageRepository: PageRepository;

  @inject(PageConfigRepository)
  private pageConfigRepository: PageConfigRepository;

  @inject(UrlService)
  private urlService: UrlService;

  @inject(ImageService)
  private imageService: ImageService;

  public async getPageData(url: string): Promise<PageData> {
    let normalizedURL = this.urlService.normalizeUrl(url, true);
    const pageConfig = await this.pageConfigRepository.findPageConfig(
      normalizedURL
    );

    if (pageConfig != null && pageConfig.preserveQueryParams.length > 0) {
      const preserved = pageConfig.preserveQueryParams.join("|");
      const matchAllExceptPreserved = `\b(?!${preserved})\b\S+`;
      const regex = new RegExp(matchAllExceptPreserved, "g");
      normalizedURL = this.urlService.normalizeUrl(url, [regex]);
    }

    const pageDetails = await this.pageRepository.findPageDetails(
      normalizedURL
    );
    if (pageDetails != null)
      return {
        websiteId: pageDetails.websiteId,
        pageId: pageDetails.pageId,
        url: normalizedURL,
        meta: pageDetails.meta // TODO: handle case when details found but meta is null (scrapping error) - maybe add scrap retry?
          ? {
              logo: pageDetails.meta.logo,
              title: pageDetails.meta.title,
            }
          : null,
      };

    // TODO: handle case when scrapping failed
    // maybe re-run later and merge if new canonical URL found
    const metaData = await this.urlService.scrapUrl(normalizedURL);

    let normalizedAlternativeUrl = null;
    if (!!metaData && metaData.canonical != null) {
      normalizedAlternativeUrl = normalizedURL;
      normalizedURL = this.urlService.normalizeUrl(metaData.canonical, false);
    }

    const parsedUrl = this.urlService.parseUrl(normalizedURL);
    if (!!metaData && !!metaData.logo)
      metaData.logo = await this.imageService.savePageLogo(
        parsedUrl,
        metaData.logo
      );

    await this.pageRepository.saveOrUpdatePageDetails(
      {
        websiteId: parsedUrl.websiteId,
        pageId: parsedUrl.pageId,
        normalized: normalizedURL,
      },
      normalizedAlternativeUrl,
      metaData
        ? {
            logo: metaData.logo,
            title: metaData.title,
          }
        : null
    );

    return {
      websiteId: parsedUrl.websiteId,
      pageId: parsedUrl.pageId,
      url: normalizedURL,
      meta: metaData
        ? {
            logo: metaData.logo,
            title: metaData.title,
          }
        : null,
    };
  }

  public async getTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Page>> {
    throw "FIXME";
    // const pages = await this.repository.findTopCommentedPages(
    //   commentsMinVoteSum,
    //   limit,
    //   userId
    // );
    // return pages.map(toDomain);
  }

  public async getTopRatedPages(
    minVoteSum: number,
    limit: number,
    userId: UserId | null
  ): Promise<Array<Page>> {
    throw "FIXME";
    // const pages = await this.repository.findTopRatedPages(
    //   minVoteSum,
    //   limit,
    //   userId
    // );
    // return pages.map(toDomain);
  }

  public async getPageDetails(
    url: string,
    fetchMetaIfNoCache: boolean,
    userId: UserId | null
  ): Promise<PageDetails> {
    throw "FIXME";
    // const parsedUrl = await this.getPageData(url);
    // const savedPageDetails = await this.repository.findOrCreatePageDetails(
    //   {
    //     pageId: parsedUrl.pageId,
    //     websiteId: parsedUrl.websiteId,
    //     normalized: parsedUrl.url.normalized,
    //   },
    //   userId
    // );

    // if (!!savedPageDetails.meta || !fetchMetaIfNoCache)
    //   return detailsToDomain(savedPageDetails);

    // const updatedPageDetails = await this.scrapAndSavePageDetails(
    //   parsedUrl, // FIXME
    //   userId
    // );

    // if (!updatedPageDetails) return detailsToDomain(savedPageDetails);
    // else return detailsToDomain(updatedPageDetails);
  }

  public async setVoteUp(url: string, userId: UserId): Promise<boolean> {
    throw "FIXME";
    // const pageData = await this.getPageData(url);
    // return await this.repository.setVoteUp(
    //   {
    //     pageId: pageData.pageId,
    //     websiteId: pageData.websiteId,
    //     normalized: pageData.url.normalized,
    //   },
    //   userId
    // );
  }

  public async setVoteDown(url: string, userId: UserId): Promise<boolean> {
    throw "FIXME";
    // const pageData = await this.getPageData(url);
    // return await this.repository.setVoteDown(
    //   {
    //     pageId: pageData.pageId,
    //     websiteId: pageData.websiteId,
    //     normalized: pageData.url.normalized,
    //   },
    //   userId
    // );
  }

  public async removeVote(url: string, userId: UserId): Promise<boolean> {
    throw "FIXME";
    // const pageData = await this.getPageData(url);
    // return await this.repository.removeVote(
    //   {
    //     pageId: pageData.pageId,
    //     websiteId: pageData.websiteId,
    //     normalized: pageData.url.normalized,
    //   },
    //   userId
    // );
  }

  private async scrapAndSavePageDetails(
    url: ParsedUrlData,
    userId: UserId | null
  ): Promise<PageDetailsEntity | null> {
    throw "FIXME";
    // const metaData = await this.scrapPageMeta(url.normalized);

    // return await this.repository.updatePageDetails(
    //   {
    //     pageId: url.pageId,
    //     websiteId: url.websiteId,
    //     normalized: url.normalized,
    //   },
    //   { logo: metaData.logo, title: metaData.title },
    //   userId
    // );
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
