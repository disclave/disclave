import { PageEntity, PageRepository } from "./db";
import { PageService, Page, PageDetails } from "./index";
import { inject, injectable } from "inversify";
import { UrlService } from "@/modules/url";

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

  public async getPageDetails(
    url: string,
    fetchIfNoCache: boolean
  ): Promise<PageDetails | null> {
    const parsedUrl = this.urlService.parseUrl(url);

    // TODO: first check DB - then, if not present in DB and fetchIfNoCache=true, scrap and save to DB
    const metadata = await this.urlService.scrapUrl(parsedUrl.normalized);

    return {
      url: parsedUrl.normalized,
      pageId: parsedUrl.pageId,
      websiteId: parsedUrl.websiteId,
      icon: metadata?.logo,
      title: metadata?.title,
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
