export interface TopRatedPageRankingParams {
  limit: number;
  websiteId: string | null;
  excludePageId: string | null;
  commentsMinVoteSum: number;
  pageMinVoteSum: number;
}
