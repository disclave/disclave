import { PageDetailsEntity, PageRepository } from "./db";
import { PageService, PageDetails } from "./index";
import { inject, injectable } from "inversify";
import { UrlMetaData, UrlService } from "@/modules/url";
import { ImageService } from "@/modules/image";
import { UserId } from "@/modules/auth";
import { PageConfigService } from "@/modules/page-config";

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
  private repository: PageRepository;

  @inject(PageConfigService)
  private pageConfigService: PageConfigService;

  @inject(UrlService)
  private urlService: UrlService;

  @inject(ImageService)
  private imageService: ImageService;

  public async getSavedPageDetails(
    url: string,
    userId: UserId | null
  ): Promise<PageDetails | null> {
    const normalized = await this.normalizeUrl(url);
    return await this.findSavedPageDetails(normalized.full, userId);
  }

  public async getPageDetails(
    url: string,
    userId: UserId | null
  ): Promise<PageDetails> {
    const normalized = await this.normalizeUrl(url);
    const savedPageDetails = await this.findSavedPageDetails(
      normalized.full,
      userId
    );
    if (savedPageDetails) return savedPageDetails;

    const metaData = await this.urlService.scrapUrl(url);
    const finalURLs = this.selectDefaultAndAlternativeUrl(normalized, metaData);
    const parsedUrl = this.urlService.parseUrl(finalURLs.default);

    if (!!metaData && !!metaData.logo)
      metaData.logo = await this.imageService.savePageLogo(
        parsedUrl,
        metaData.logo
      );

    const result = await this.repository.createOrUpdatePageDetails(
      {
        websiteId: parsedUrl.websiteId,
        pageId: parsedUrl.pageId,
        normalized: finalURLs.default,
      },
      finalURLs.alternative,
      metaData
        ? {
            logo: metaData.logo,
            title: metaData.title,
          }
        : null,
      userId
    );

    return toDomain(result);
  }

  private async findSavedPageDetails(
    normalizedUrl: string,
    userId: UserId | null
  ): Promise<PageDetails | null> {
    const pageDetails = await this.repository.findPageDetails(
      normalizedUrl,
      userId
    );
    return pageDetails ? toDomain(pageDetails) : null;
  }

  private async normalizeUrl(
    url: string
  ): Promise<NormalizedWithCanonicalCandidate> {
    const normalizedURLNoQP = this.urlService.normalizeUrl(url, true);
    const pageConfig = await this.pageConfigService.getPageConfig(
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
    const canonical =
      metaData == null || metaData.canonical == null
        ? normalized.canonicalCandidate
        : this.urlService.normalizeUrl(metaData.canonical, false);

    return {
      default: canonical,
      alternative: getIfNotEqual(normalized.full, canonical),
    };
  }
}

function getIfNotEqual(value: string, compareTo: string): string | null {
  return value === compareTo ? null : value;
}

function toDomain(entity: PageDetailsEntity): PageDetails {
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
}
