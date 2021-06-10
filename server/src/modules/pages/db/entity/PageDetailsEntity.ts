interface Votes {
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
}

export interface PageMetaEntity {
  logo: string | null;
  title: string | null;
}
export interface PageDetailsEntity {
  pageId: string;
  websiteId: string;
  url: string;
  meta: PageMetaEntity | null;
  votes: Votes;
}
