interface CommentEntityUrlMeta {
  raw: string;
  websiteId: string;
  pageId: string;
}

interface CommentAuthor {
  id: string;
  name: string;
}

export interface CommentEntity {
  id: string;
  text: string;
  author: CommentAuthor;
  timestamp: string;
  url: CommentEntityUrlMeta;
}
