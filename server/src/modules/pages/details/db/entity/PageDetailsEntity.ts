import { PageMetaEntity } from "./PageMetaEntity";

interface Votes {
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
}

export interface PageDetailsEntity {
  pageId: string;
  websiteId: string;
  url: string;
  meta: PageMetaEntity | null;
  votes: Votes;
}
