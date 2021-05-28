import { gql } from "apollo-server-micro";

export const pagesTypeDefs = gql`
  type PageVotes {
    sum: Int!
    votedUp: Boolean!
    votedDown: Boolean!
  }

  type PageMeta {
    logo: String
    title: String
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

  type PageDetails {
    url: String!
    pageId: String!
    websiteId: String!
    votes: PageVotes!
    meta: PageMeta
  }

  extend type Query {
    topCommentedPages(minCommentsVoteSum: Int!, limit: Int!): [Page!]
    topRatedPages(minVoteSum: Int!, limit: Int!): [Page!]
    pageDetails(url: String!, fetchMetaIfNoCache: Boolean!): PageDetails!
  }

  extend type Mutation {
    removePageVote(url: String!): Boolean!
    addPageVoteUp(url: String!): Boolean!
    addPageVoteDown(url: String!): Boolean!
  }
`;
