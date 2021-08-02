import { gql } from "apollo-server-express";

export const typeDefs = gql`
  input UrlId {
    websiteId: String!
    pageId: String!
  }

  type PageVotes {
    sum: Int!
    votedUp: Boolean!
    votedDown: Boolean!
  }

  type PageMeta {
    logo: String
    title: String
  }

  type PageDetails {
    url: String!
    pageId: String!
    websiteId: String!
    votes: PageVotes!
    meta: PageMeta
  }

  extend type Query {
    pageDetails(url: String!): PageDetails!
  }
`;
