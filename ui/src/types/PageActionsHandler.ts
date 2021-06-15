export type PageActionsHandler = {
  onVoteDown: (websiteId: string, pageId: string) => Promise<void>;
  onVoteRemove: (websiteId: string, pageId: string) => Promise<void>;
  onVoteUp: (websiteId: string, pageId: string) => Promise<void>;
};
