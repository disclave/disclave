import { PageComment } from "./models";
import { UserId } from "@/modules/auth";
import { UrlId } from "@/modules/pages";

export type { PageComment };

export abstract class PageCommentService {
  abstract getPageComments(
    urlId: UrlId,
    userId: UserId | null
  ): Promise<Array<PageComment>>;

  abstract addPageComment(
    userId: UserId,
    text: string,
    urlId: UrlId,
    rawUrl: string
  ): Promise<PageComment>;
}
