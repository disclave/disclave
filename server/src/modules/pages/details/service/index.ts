import { PageDetails, PageMeta } from "./models";
import { UserId } from "@/modules/auth";
import { UrlId } from "@/modules/pages";

export type { PageDetails, PageMeta };

export abstract class PageDetailsService {
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
