interface Votes {
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
}

export interface PageMeta {
  title: string | null;
  logo: string | null;
}

export interface PageDetails {
  websiteId: string;
  pageId: string;
  url: string;
  votes: Votes;
  meta: PageMeta | null;
}
