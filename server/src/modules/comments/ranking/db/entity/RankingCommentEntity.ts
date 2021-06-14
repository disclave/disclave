interface PageMeta {
  logo: string | null;
  title: string | null;
}

interface Page {
  websiteId: string;
  pageId: string;
  meta: PageMeta | null;
}

interface Author {
  name: string;
}

interface Votes {
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
}

export interface RankingCommentEntity {
  id: string;
  text: string;
  author: Author;
  votes: Votes;
  timestamp: string;
  page: Page;
}
