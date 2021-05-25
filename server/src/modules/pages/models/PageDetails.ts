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
  meta: null | {
    title: string | null;
    logo: string | null;
  };
}
