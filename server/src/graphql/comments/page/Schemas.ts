import { gql } from "apollo-server-express";

export const typeDefs = gql`
  input PageCommentInput {
    text: String!
    urlId: UrlId!
    rawUrl: String!
  }

  type PageCommentAuthor {
    name: String!
  }

  type PageCommentVotes {
    sum: Int!
    votedUp: Boolean!
    votedDown: Boolean!
  }

  type PageComment {
    id: ID!
    text: String!
    author: PageCommentAuthor!
    votes: PageCommentVotes!
    timestamp: String!
  }

  extend type Query {
    getPageComments(urlId: UrlId!): [PageComment!]
  }

  extend type Mutation {
    createPageComment(comment: PageCommentInput!): PageComment!
  }
`;
