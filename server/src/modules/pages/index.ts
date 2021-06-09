import { PageDetails, UrlId } from "./models";
import { UserId } from "@/modules/auth";

export type { PageDetails, UrlId };

export abstract class PageService {
  abstract getSavedPageDetails(
    url: string,
    userId: UserId | null
  ): Promise<PageDetails | null>;

  abstract getPageDetails(
    url: string,
    userId: UserId | null
  ): Promise<PageDetails>;
}
