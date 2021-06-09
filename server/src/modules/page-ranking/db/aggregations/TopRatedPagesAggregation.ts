export interface TopRatedPagesAggregation {
  _id: {
    websiteId: string;
    pageId: string;
  };
  normalizedUrl: string;
  votesSum: number;
  votesUp: string[] | null;
  votesDown: string[] | null;
  meta: null | {
    logo: string | null;
    title: string | null;
  };
  comments: {
    count: number;
  };
}
