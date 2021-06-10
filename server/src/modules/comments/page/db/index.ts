import { PageCommentEntity } from "./entity";
import { BaseRepository } from "@/repository";
import { UserId } from "@/modules/auth";
import { UrlId } from "@/modules/pages";

export type { PageCommentEntity };

export interface AuthorInfo {
  uid: UserId;
  name: string;
}

export interface UrlData {
  urlId: UrlId;
  rawUrl: string;
  urlMeta: null | {
    logo: string | null;
    title: string | null;
  };
}

export abstract class PageCommentRepository<
  T = unknown
> extends BaseRepository<T> {
  abstract findPageComments(
    urlId: UrlId,
    uid: UserId | null
  ): Promise<Array<PageCommentEntity>>;

  abstract addPageComment(
    author: AuthorInfo,
    text: string,
    urlData: UrlData
  ): Promise<PageCommentEntity>;
}
