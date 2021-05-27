export type PageActionsHandler = {
  onVoteDown: (url: string) => Promise<void>;
  onVoteRemove: (url: string) => Promise<void>;
  onVoteUp: (url: string) => Promise<void>;
};

export interface PageModel {
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
