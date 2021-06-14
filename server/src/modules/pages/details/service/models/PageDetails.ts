import { PageMeta } from "./PageMeta";

interface Votes {
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
}

export interface PageDetails {
  websiteId: string;
  pageId: string;
  url: string;
  votes: Votes;
  meta: PageMeta | null;
}
