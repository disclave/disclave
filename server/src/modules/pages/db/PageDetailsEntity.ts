interface Votes {
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
}

export interface PageDetailsEntity {
  pageId: string;
  websiteId: string;
  meta: null | {
    logo: string | null;
    title: string | null;
  };
  votes: Votes;
}
