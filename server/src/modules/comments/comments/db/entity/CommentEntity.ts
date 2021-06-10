import { UserId } from "@/modules/auth";

interface CommentEntityUrlMeta {
  raw: string;
  websiteId: string;
  pageId: string;
}

interface CommentAuthor {
  id: UserId;
  name: string;
}

interface Votes {
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
}

export interface CommentEntity {
  id: string;
  text: string;
  author: CommentAuthor;
  votes: Votes;
  timestamp: string;
  url: CommentEntityUrlMeta;
}
