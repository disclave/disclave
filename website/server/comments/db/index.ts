import {CommentEntity} from "./CommentEntity";
import {CommentRepository} from "./CommentRepository";
import {Port} from "../../../helpers/Port";

export type {
  CommentEntity
}

export interface UrlMeta {
  raw: string,
  websiteId: string,
  pageId: string
}

export interface AuthorInfo {
  id: string,
  name: string
}

export interface ICommentRepository {
  findComments(url: UrlMeta): Promise<Array<CommentEntity>>

  addComment(author: AuthorInfo, text: string, url: UrlMeta): Promise<CommentEntity>
}

export const commentRepositoryPort = new Port<ICommentRepository>(CommentRepository)