import { PageCommentModel } from "@/types";
import { randomDate, randomInt } from "./helpers";

export interface BuildExampleCommentProps {
  text?: string;
  timestamp?: Date;
  authorName?: string;
  voteSum?: number;
  votedUp?: boolean;
  votedDown?: boolean;
}

export const buildExampleComment = ({
  text = "Example comment text.",
  timestamp = randomDate(new Date(2012, 0, 1), new Date()),
  authorName = "author_name",
  voteSum = randomInt(-50, 100),
  votedUp = false,
  votedDown = false,
}: BuildExampleCommentProps): PageCommentModel => ({
  id: "mock-comment-id-" + Math.random(),
  text: text,
  author: {
    name: authorName,
  },
  votes: {
    sum: voteSum,
    votedUp: votedUp,
    votedDown: votedDown,
  },
  timestamp: timestamp.toISOString(),
});

export const RandomCommentsList = (
  size: number,
  text?: string
): PageCommentModel[] => {
  const result: PageCommentModel[] = [];
  while (size--) {
    result.push(
      buildExampleComment({
        text: text ? text : "Comment text " + Math.random(),
      })
    );
  }
  return result;
};

export const ExampleComment: PageCommentModel = {
  id: "mock-comment-id",
  text: "This is example comment text!",
  author: {
    name: "author_name",
  },
  votes: {
    sum: 1,
    votedUp: true,
    votedDown: false,
  },
  timestamp: new Date().toISOString(),
};
