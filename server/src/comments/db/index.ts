import { CommentEntity } from "./CommentEntity";
import { UserId } from "../../auth";
import { BaseRepository } from "../../repository";

export type { CommentEntity };

export interface UrlMeta {
  raw: string;
  websiteId: string;
  pageId: string;
}

export interface AuthorInfo {
  id: UserId;
  name: string;
}

export abstract class CommentRepository<T = unknown> extends BaseRepository<T> {
  abstract findComments(url: UrlMeta): Promise<Array<CommentEntity>>;

  abstract countComments(url: UrlMeta): Promise<number>;

  abstract addComment(
    author: AuthorInfo,
    text: string,
    url: UrlMeta
  ): Promise<CommentEntity>;

  abstract setVoteUp(
    commentId: string,
    uid: UserId,
    transaction?: T
  ): Promise<void>;
  abstract setVoteDown(
    commentId: string,
    uid: UserId,
    transaction?: T
  ): Promise<void>;
  abstract removeVote(
    commentId: string,
    uid: UserId,
    transaction?: T
  ): Promise<void>;
}
