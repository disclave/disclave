export interface TopCommentedPageRankingParams {
  limit: number;
  websiteId: string | null;
  excludePageId: string | null;
  commentsMinVoteSum: number;
}
