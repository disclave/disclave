import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  input TopCommentedPageRankingParams {
    limit: Int!
    websiteId: String
    excludePageId: String
    commentsMinVoteSum: Int!
  }

  input TopRatedPageRankingParams {
    limit: Int!
    websiteId: String
    excludePageId: String
    commentsMinVoteSum: Int!
    pageMinVoteSum: Int!
  }

  type Page {
    id: ID!
    websiteId: String!
    pageId: String!
    commentsCount: String!
    url: String!
    meta: PageMeta
    votes: PageVotes!
  }

  extend type Query {
    topCommentedPages(params: TopCommentedPageRankingParams!): [Page!]
    topRatedPages(params: TopRatedPageRankingParams!): [Page!]
  }
`;
