import { ApolloError } from "apollo-server-errors";

export const CommentTextMinLength = (message: string) =>
  new ApolloError(message, "comment-text/min-length");
export const CommentTextMaxLength = (message: string) =>
  new ApolloError(message, "comment-text/max-length");
