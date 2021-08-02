import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type RankingCommentAuthor {
    name: String!
  }

  type RankingCommentVotes {
    sum: Int!
    votedUp: Boolean!
    votedDown: Boolean!
  }

  type RankingCommentPageMeta {
    logo: String
    title: String
  }

  type RankingCommentPage {
    websiteId: String!
    pageId: String!
    meta: RankingCommentPageMeta
  }

  type RankingComment {
    id: ID!
    text: String!
    author: RankingCommentAuthor!
    votes: RankingCommentVotes!
    timestamp: String!
    page: RankingCommentPage!
  }

  extend type Query {
    latestCommentsRanking(minVoteSum: Int!, limit: Int!): [RankingComment!]
    topCommentsRanking(minVoteSum: Int!, limit: Int!): [RankingComment!]
  }
`;
