export interface CommentUrlMeta {
  websiteId: string,
  pageId: string
}

export interface CommentAuthor {
  id: string,
  name: string
}

export interface CommentModel {
  id: string,
  text: string,
  author: CommentAuthor,
  timestamp: string,
  urlMeta: CommentUrlMeta
}