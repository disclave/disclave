import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  extend type Mutation {
    removePageVote(urlId: UrlId!): Boolean!
    addPageVoteUp(urlId: UrlId!): Boolean!
    addPageVoteDown(urlId: UrlId!): Boolean!
  }
`;
