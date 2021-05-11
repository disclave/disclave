import { ApolloError } from "apollo-server-errors";

export const Unauthorized = (message: string) =>
  new ApolloError(message, "unauthorized");
