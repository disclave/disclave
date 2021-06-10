import { PageDetails, PageMeta, UrlId } from "./models";
import { UserId } from "@/modules/auth";

export type { PageDetails, PageMeta, UrlId };

export abstract class PageService {
  abstract getSavedPageMeta(urlId: UrlId): Promise<PageMeta | null>;

  abstract getSavedPageDetails(
    url: string,
    userId: UserId | null
  ): Promise<PageDetails | null>;

  abstract getPageDetails(
    url: string,
    userId: UserId | null
  ): Promise<PageDetails>;
}
