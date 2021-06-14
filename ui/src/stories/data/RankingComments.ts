import { RankingCommentModel } from "@/types";
import { randomDate, randomInt } from "./helpers";

export interface BuildExampleCommentProps {
  text?: string;
  timestamp?: Date;
  authorName?: string;
  voteSum?: number;
  votedUp?: boolean;
  votedDown?: boolean;
  websiteId?: string;
  pageId?: string;
}

export const buildExampleComment = ({
  text = "Example comment text.",
  timestamp = randomDate(new Date(2012, 0, 1), new Date()),
  authorName = "author_name",
  voteSum = randomInt(-50, 100),
  votedUp = false,
  votedDown = false,
  websiteId = "example.com",
  pageId = "%2Fpage%2Fwith%2Fexample%2Furl",
}: BuildExampleCommentProps): RankingCommentModel => ({
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
  page: {
    websiteId: websiteId,
    pageId: pageId,
    meta: null,
  },
});

export const RandomCommentsList = (
  size: number,
  text?: string
): RankingCommentModel[] => {
  const result: RankingCommentModel[] = [];
  while (size--) {
    result.push(
      buildExampleComment({
        text: text ? text : "Comment text " + Math.random(),
      })
    );
  }
  return result;
};

export const ExampleComment: RankingCommentModel = {
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
  page: {
    websiteId: "example.com",
    pageId: "%2Fpage%2Fwith%2Fexample%2Furl",
    meta: null,
  },
};
