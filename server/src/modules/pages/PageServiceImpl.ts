import { PageDetailsEntity, PageEntity, PageRepository } from "./db";
import { PageService, Page, PageDetails } from "./index";
import { inject, injectable } from "inversify";
import { ParsedUrlData, UrlMetaData, UrlService } from "@/modules/url";
import { ImageService } from "@/modules/image";

@injectable()
export class PageServiceImpl implements PageService {
  @inject(PageRepository)
  private repository: PageRepository;

  @inject(UrlService)
  private urlService: UrlService;

  @inject(UrlService)
  private imageService: ImageService;

  public async getTopCommentedPages(
    commentsMinVoteSum: number,
    limit: number
  ): Promise<Array<Page>> {
    const pages = await this.repository.findTopCommentedPages(
      commentsMinVoteSum,
      limit
    );
    return pages.map(toDomain);
  }

  public async getPageDetails(
    url: string,
    fetchMetaIfNoCache: boolean
  ): Promise<PageDetails> {
    const parsedUrl = this.urlService.parseUrl(url);

    const savedPageDetails = await this.repository.findPageDetails({
      pageId: parsedUrl.pageId,
      websiteId: parsedUrl.websiteId,
    });

    if (!!savedPageDetails || !fetchMetaIfNoCache)
      return detailsToDomain(savedPageDetails, parsedUrl);

    const metadata = await this.scapAndSavePageDetails(parsedUrl);
    return urlMetadataToDomain(metadata, parsedUrl);
  }

  private async scapAndSavePageDetails(
    url: ParsedUrlData
  ): Promise<UrlMetaData | null> {
    const metadata = await this.urlService.scrapUrl(url.normalized);
    if (!metadata) return null;

    const title = metadata.title;
    const logo = await this.imageService.savePageLogo(url, metadata.logo);

    await this.repository.savePageDetails(
      { pageId: url.pageId, websiteId: url.websiteId },
      { logo, title }
    );
    return {
      logo,
      title,
    };
  }
}
const toDomain = (entity: PageEntity): Page => {
  return {
    id: entity.id,
    websiteId: entity.websiteId,
    pageId: entity.pageId,
    commentsCount: entity.commentsCount,
  };
};

const detailsToDomain = (
  entity: PageDetailsEntity | null,
  url: ParsedUrlData
): PageDetails => {
  return {
    url: url.normalized,
    pageId: url.pageId,
    websiteId: url.websiteId,
    meta: entity
      ? {
          logo: entity.meta.logo,
          title: entity.meta.title,
        }
      : null,
  };
};

const urlMetadataToDomain = (
  meta: UrlMetaData | null,
  url: ParsedUrlData
): PageDetails => {
  return {
    url: url.normalized,
    pageId: url.pageId,
    websiteId: url.websiteId,
    meta: meta
      ? {
          logo: meta.logo ?? null,
          title: meta.title ?? null,
        }
      : null,
  };
};
