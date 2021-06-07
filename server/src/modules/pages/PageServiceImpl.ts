import {
  PageConfigRepository,
  PageDetailsEntity,
  PageEntity,
  PageRepository,
} from "./db";
import { PageService, Page, PageDetails, UrlPageId } from "./index";
import { inject, injectable } from "inversify";
import { ParsedUrlData, UrlMetaData, UrlService } from "@/modules/url";
import { ImageService } from "@/modules/image";
import { UserId } from "@/modules/auth";

interface NormalizedWithCanonicalCandidate {
  full: string;
  canonicalCandidate: string;
}

interface DefaultAndAltUrl {
  default: string;
  alternative: string | null;
}

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

  public async getPageData(url: string): Promise<UrlPageId> {
    const normalized = await this.normalizeUrl(url);
    const pageDetails = await this.pageRepository.findPageDetails(
      normalized.full
    );
    if (pageDetails != null)
      return {
        websiteId: pageDetails.websiteId,
        pageId: pageDetails.pageId,
      };

    // TODO: handle case when scrapping failed
    // maybe re-run later and merge if new canonical URL found?
    const metaData = await this.urlService.scrapUrl(url);
    console.log("metaData", metaData);

    const finalURLs = this.selectDefaultAndAlternativeUrl(normalized, metaData);
    console.log("finalURLs", finalURLs);

    const parsedUrl = this.urlService.parseUrl(finalURLs.default);
    console.log("parsedUrl", parsedUrl);

    throw "OOPS!";

    if (!!metaData && !!metaData.logo)
      metaData.logo = await this.imageService.savePageLogo(
        parsedUrl,
        metaData.logo
      );
    console.log("metaData", metaData);

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

  private async normalizeUrl(
    url: string
  ): Promise<NormalizedWithCanonicalCandidate> {
    const normalizedURLNoQP = this.urlService.normalizeUrl(url, true);
    const pageConfig = await this.pageConfigRepository.findPageConfig(
      normalizedURLNoQP
    );

    if (pageConfig == null || !pageConfig.preserveQueryParams.length) {
      const normalizedAllQP = this.urlService.normalizeUrl(url, false);
      return {
        full: normalizedAllQP,
        canonicalCandidate: normalizedURLNoQP,
      };
    }

    const preserved = pageConfig.preserveQueryParams
      .map((s) => `${s}$`)
      .join("|");
    const matchAllExceptPreserved = `^(?!${preserved})`;
    const regex = new RegExp(matchAllExceptPreserved, "i");
    const normalizedDefaultQP = this.urlService.normalizeUrl(url, [regex]);
    return {
      full: normalizedDefaultQP,
      canonicalCandidate: normalizedDefaultQP,
    };
  }

  private selectDefaultAndAlternativeUrl(
    normalized: NormalizedWithCanonicalCandidate,
    metaData: UrlMetaData | null
  ): DefaultAndAltUrl {
    if (metaData == null || metaData.canonical == null)
      return {
        default: normalized.canonicalCandidate,
        alternative: null,
      };

    const normalizedURL = this.urlService.normalizeUrl(
      metaData.canonical,
      false
    );
    return {
      default: normalizedURL,
      alternative: normalizedURL === normalized.full ? null : normalized.full,
    };
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
