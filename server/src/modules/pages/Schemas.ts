import { gql } from "apollo-server-micro";

export const pagesTypeDefs = gql`
  type Page {
    id: ID
    websiteId: String
    pageId: String
    commentsCount: String
  }

  extend type Query {
    topCommentedPages(minCommentsVoteSum: Int!, limit: Int!): [Page]
  }
`;
