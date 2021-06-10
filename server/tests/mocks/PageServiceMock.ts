import { PageService, UrlId, PageMeta, PageDetails } from "@/modules/pages";
import { injectable } from "inversify";
import { UserId } from "@/modules/auth";

@injectable()
export class PageServiceMock implements PageService {
  async getSavedPageMeta(urlId: UrlId): Promise<PageMeta | null> {
    return null;
  }

  async getSavedPageDetails(
    url: string,
    userId: UserId | null
  ): Promise<PageDetails | null> {
    throw "Not implemented";
  }

  async getPageDetails(
    url: string,
    userId: UserId | null
  ): Promise<PageDetails> {
    throw "Not implemented";
  }
}
