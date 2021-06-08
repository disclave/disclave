export type PageActionsHandler = {
  onVoteDown: (websiteId: string, pageId: string) => Promise<void>;
  onVoteRemove: (websiteId: string, pageId: string) => Promise<void>;
  onVoteUp: (websiteId: string, pageId: string) => Promise<void>;
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
