import { PageDetailsEntity, PageEntity, PageRepository } from "./db";
import { PageService, Page, PageDetails } from "./index";
import { inject, injectable } from "inversify";
import { ParsedUrlData, UrlMetaData, UrlService } from "@/modules/url";

@injectable()
export class PageServiceImpl implements PageService {
  @inject(PageRepository)
  private repository: PageRepository;

  @inject(UrlService)
  private urlService: UrlService;

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

  public async getPageDetails(url: string): Promise<PageDetails> {
    const parsedUrl = this.urlService.parseUrl(url);

    const savedPageDetails = await this.repository.findPageDetails({
      pageId: parsedUrl.pageId,
      websiteId: parsedUrl.websiteId,
    });

    if (!!savedPageDetails) return detailsToDomain(savedPageDetails, parsedUrl);

    const metadata = await this.urlService.scrapUrl(parsedUrl.normalized);

    if (metadata) {
      await this.repository.savePageDetails(
        { pageId: parsedUrl.pageId, websiteId: parsedUrl.websiteId },
        { logo: metadata.logo, title: metadata.title }
      );
    }

    return urlMetadataToDomain(metadata, parsedUrl);
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
    logo: entity?.logo ?? null,
    title: entity?.title ?? null,
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
    logo: meta?.logo ?? null,
    title: meta?.title ?? null,
  };
};
