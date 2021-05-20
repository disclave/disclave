import { gql } from "apollo-server-micro";

export const pagesTypeDefs = gql`
  type Page {
    id: ID!
    websiteId: String!
    pageId: String!
    commentsCount: String!
  }

  type PageDetails {
    url: String!
    pageId: String!
    websiteId: String!
    icon: String
    title: String
  }

  extend type Query {
    topCommentedPages(minCommentsVoteSum: Int!, limit: Int!): [Page]
    pageDetails(url: String, fetchIfNoCache: Boolean!): PageDetails
  }
`;
