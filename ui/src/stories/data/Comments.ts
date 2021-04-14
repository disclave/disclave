import {
  CommentActionsHandler,
  CommentModel,
} from "@/components/comments/CommentModel";

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
  websiteId?: string;
  pageId?: string;
}

export const buildExampleComment = ({
  text = "Example comment text.",
  timestamp = randomDate(new Date(2012, 0, 1), new Date()),
  authorId = "mock-author-id" + Math.random(),
  authorName = "author_name",
  voteSum = randomInt(-50, 100),
  votedUp = false,
  votedDown = false,
  websiteId = "example.com",
  pageId = "%2Fpage%2Fwith%2Fexample%2Furl",
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
  urlMeta: {
    websiteId: websiteId,
    pageId: pageId,
  },
});

export const RandomCommentsList = (
  size: number,
  text?: string
): CommentModel[] => {
  const result: CommentModel[] = [];
  while (size--) {
    result.push(
      buildExampleComment({
        text: text ? text : "Comment text " + Math.random(),
      })
    );
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
  urlMeta: {
    websiteId: "example.com",
    pageId: "%2Fpage%2Fwith%2Fexample%2Furl",
  },
};

export const EmptyActionHandler: CommentActionsHandler = {
  onVoteDown: async () => {},
  onVoteRemove: async () => {},
  onVoteUp: async () => {},
};
