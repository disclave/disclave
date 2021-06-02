export interface Page {
  id: string;
  websiteId: string;
  pageId: string;
  commentsCount: number;
  url: string;
  meta: null | {
    logo: string | null;
    title: string | null;
  };
  votes: {
    sum: number;
    votedUp: boolean;
    votedDown: boolean;
  };
}
