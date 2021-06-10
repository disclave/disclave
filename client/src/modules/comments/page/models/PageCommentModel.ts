interface Author {
  name: string;
}

interface Votes {
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
}

export interface PageCommentModel {
  id: string;
  text: string;
  author: Author;
  votes: Votes;
  timestamp: string;
}
