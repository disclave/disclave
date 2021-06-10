import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  extend type Query {
    latestComments(minVoteSum: Int!, limit: Int!): [Comment!]
    topComments(minVoteSum: Int!, limit: Int!): [Comment!]
  }
`;