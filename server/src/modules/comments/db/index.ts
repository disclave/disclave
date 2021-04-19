import { CommentEntity } from "./CommentEntity";
import { UserId } from "@/modules/auth";
import { BaseRepository } from "@/repository";

export type { CommentEntity };

export interface UrlMeta {
  raw: string;
  websiteId: string;
  pageId: string;
}

export interface AuthorInfo {
  uid: UserId;
  name: string;
}

export abstract class CommentRepository<T = unknown> extends BaseRepository<T> {
  abstract findComments(
    url: UrlMeta,
    uid: UserId | null
  ): Promise<Array<CommentEntity>>;

  abstract findLatestComments(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<CommentEntity>>;

  abstract findTopComments(
    minVoteSum: number,
    limit: number,
    uid: UserId | null
  ): Promise<Array<CommentEntity>>;

  abstract countComments(url: UrlMeta): Promise<number>;

  abstract addComment(
    author: AuthorInfo,
    text: string,
    url: UrlMeta
  ): Promise<CommentEntity>;

  abstract setVoteUp(commentId: string, uid: UserId): Promise<boolean>;
  abstract setVoteDown(commentId: string, uid: UserId): Promise<boolean>;
  abstract removeVote(commentId: string, uid: UserId): Promise<boolean>;
}
