import { gql } from "apollo-server-micro";

// TODO: add voting schemas
export const pagesTypeDefs = gql`
  type Page {
    id: ID!
    websiteId: String!
    pageId: String!
    commentsCount: String!
  }

  type PageMeta {
    logo: String
    title: String
  }

  type PageDetails {
    url: String!
    pageId: String!
    websiteId: String!
    meta: PageMeta
  }

  extend type Query {
    topCommentedPages(minCommentsVoteSum: Int!, limit: Int!): [Page]
    pageDetails(url: String!, fetchMetaIfNoCache: Boolean!): PageDetails!
  }
`;
