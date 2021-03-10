import { CommentModel } from "../../components/comments/CommentModel";

export const buildExampleComment = (text: string): CommentModel => ({
  id: "mock-comment-id-" + Math.random(),
  text: text,
  author: {
    id: "mock-author-id" + Math.random(),
    name: "author_name",
  },
  timestamp: new Date().toISOString(),
});

export const ExampleComment: CommentModel = {
  id: "mock-comment-id",
  text: "This is example comment text!",
  author: {
    id: "mock-author-id",
    name: "author_name",
  },
  timestamp: new Date().toISOString(),
};

export const ExampleCommentsList: CommentModel[] = [
  {
    id: "mock-comment-id-1",
    text: "This is example comment text! 1",
    author: {
      id: "mock-author-id-1",
      name: "author_name_1",
    },
    timestamp: new Date(1615282385162).toISOString(),
  },
  {
    id: "mock-comment-id-2",
    text: "This is example comment text! 2",
    author: {
      id: "mock-author-id-2",
      name: "author_name_2",
    },
    timestamp: new Date(1614252375352).toISOString(),
  },
  {
    id: "mock-comment-id-3",
    text: "This is example comment text! 3",
    author: {
      id: "mock-author-id-3",
      name: "author_name_3",
    },
    timestamp: new Date(1613172365228).toISOString(),
  },
  {
    id: "mock-comment-id-4",
    text: "This is example comment text! 4",
    author: {
      id: "mock-author-id-4",
      name: "author_name_4",
    },
    timestamp: new Date(1612222355284).toISOString(),
  },
];
