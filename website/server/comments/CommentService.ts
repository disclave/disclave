import {Comment} from "./Comment";
import {CommentRepository} from "./db/CommentRepository";
import {CommentEntity} from "./db/CommentEntity";

const repository = new CommentRepository()

export class CommentService {
  public async getComments(url: string): Promise<Array<Comment>> {
    const parsedUrl = parseUrl(url)
    const comments = await repository.findComments(parsedUrl.websiteId, parsedUrl.pageId)
    return comments.map(toDomain)
  }

  public async addComment(text: string, url: string): Promise<Comment> {
    const parsedUrl = parseUrl(url)
    const result = await repository.addComment(text, parsedUrl.websiteId, parsedUrl.pageId)
    return toDomain(result)
  }
}

interface WebsitePageId {
  websiteId: string,
  pageId: string
}

const parseUrl = (urlString: string): WebsitePageId => {
  const url = new URL(urlString)
  return {
    websiteId: encodeURI(url.hostname),
    pageId: encodeURI(url.pathname)
  }
}

const encodeURI = (str: string): string => {
  return encodeURIComponent(str)
    .replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16))
}

const toDomain = (entity: CommentEntity): Comment => {
  return {
    id: entity.id,
    text: entity.text,
    websiteId: entity.websiteId,
    pageId: entity.pageId
  }
}
