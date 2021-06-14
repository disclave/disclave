export interface PageVotes {
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
}
export interface PageDetailsModel {
  url: string;
  pageId: string;
  websiteId: string;
  votes: PageVotes;
  meta: null | {
    logo: string | null;
    title: string | null;
  };
}
