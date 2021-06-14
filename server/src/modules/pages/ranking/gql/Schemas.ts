import { gql } from "apollo-server-micro";

export const typeDefs = gql`
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
    topCommentedPages(minCommentsVoteSum: Int!, limit: Int!): [Page!]
    topRatedPages(minVoteSum: Int!, limit: Int!): [Page!]
  }
`;
