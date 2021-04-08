import { CommentModel } from "@/components/comments/CommentModel";

const randomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export const commentsTimestampComparator = (a: CommentModel, b: CommentModel) =>
  Date.parse(b.timestamp) - Date.parse(a.timestamp);

export interface BuildExampleCommentProps {
  text?: string;
  timestamp?: Date;
  authorId?: string;
  authorName?: string;
  voteSum?: number;
  votedUp?: boolean;
  votedDown?: boolean;
}

export const buildExampleComment = ({
  text = "Example comment text.",
  timestamp = randomDate(new Date(2012, 0, 1), new Date()),
  authorId = "mock-author-id" + Math.random(),
  authorName = "author_name",
  voteSum = randomInt(-50, 100),
  votedUp = false,
  votedDown = false,
}: BuildExampleCommentProps): CommentModel => ({
  id: "mock-comment-id-" + Math.random(),
  text: text,
  author: {
    id: authorId,
    name: authorName,
  },
  votes: {
    sum: voteSum,
    votedUp: votedUp,
    votedDown: votedDown,
  },
  timestamp: timestamp.toISOString(),
});

export const RandomCommentsList = (size: number): CommentModel[] => {
  const result: CommentModel[] = [];
  while (size--) {
    result.push(buildExampleComment({ text: "Comment text " + Math.random() }));
  }
  return result;
};

export const ExampleComment: CommentModel = {
  id: "mock-comment-id",
  text: "This is example comment text!",
  author: {
    id: "mock-author-id",
    name: "author_name",
  },
  votes: {
    sum: 1,
    votedUp: true,
    votedDown: false,
  },
  timestamp: new Date().toISOString(),
};
