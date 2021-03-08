import {AuthorInfo, CommentEntity, ICommentRepository, UrlMeta} from "../../server/comments/db";

export class CommentRepositoryMock implements ICommentRepository {
  addComment(author: AuthorInfo, text: string, url: UrlMeta): Promise<CommentEntity> {
    return Promise.resolve(undefined);
  }

  findComments(url: UrlMeta): Promise<Array<CommentEntity>> {
    return Promise.resolve(undefined);
  }
}