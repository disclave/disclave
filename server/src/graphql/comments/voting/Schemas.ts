import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Mutation {
    removeCommentVote(commentId: ID!): Boolean!
    addCommentVoteUp(commentId: ID!): Boolean!
    addCommentVoteDown(commentId: ID!): Boolean!
  }
`;
