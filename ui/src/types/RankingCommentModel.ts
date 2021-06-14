import { CommentVotesModel } from ".";

interface Author {
  name: string;
}

interface Meta {
  logo: string | null;
  title: string | null;
}

interface Page {
  websiteId: string;
  pageId: string;
  meta: Meta | null;
}

export interface RankingCommentModel {
  id: string;
  text: string;
  timestamp: string;
  author: Author;
  votes: CommentVotesModel;
  page: Page;
}
