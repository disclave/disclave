export interface TopCommentedPagesAggregation {
  _id: {
    websiteId: string;
    pageId: string;
  };
  commentsCount?: number;
  page: {
    meta: null | {
      logo: string | null;
      title: string | null;
    };
    votesSum: number;
    votesUp: string[] | null;
    votesDown: string[] | null;
    normalizedUrl: string;
  };
}
