import { CommentEntity } from "./CommentEntity";
import { BaseRepository } from "@/repository";

export type { CommentEntity };

export interface UrlMeta {
  raw: string;
  websiteId: string;
  pageId: string;
}

export interface AuthorInfo {
  uid: string;
  name: string;
}

export abstract class CommentRepository<T = unknown> extends BaseRepository<T> {
  abstract findComments(
    url: UrlMeta,
    uid: string | null
  ): Promise<Array<CommentEntity>>;

  abstract findLatestComments(
    minVoteSum: number,
    limit: number,
    uid: string | null
  ): Promise<Array<CommentEntity>>;

  abstract findTopComments(
    minVoteSum: number,
    limit: number,
    uid: string | null
  ): Promise<Array<CommentEntity>>;

  abstract countComments(url: UrlMeta): Promise<number>;

  abstract addComment(
    author: AuthorInfo,
    text: string,
    url: UrlMeta
  ): Promise<CommentEntity>;

  abstract setVoteUp(commentId: string, uid: string): Promise<boolean>;
  abstract setVoteDown(commentId: string, uid: string): Promise<boolean>;
  abstract removeVote(commentId: string, uid: string): Promise<boolean>;
}
