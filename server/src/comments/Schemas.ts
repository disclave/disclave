import { gql } from "apollo-server-micro";

export const commentsTypeDefs = gql`
  input CommentInput {
    text: String
    url: String
  }

  type CommentUrlMeta {
    websiteId: String
    pageId: String
  }

  type CommentAuthor {
    id: ID
    name: String
  }

  type CommentVotes {
    sum: Int
    votedUp: Boolean
    votedDown: Boolean
  }

  type Comment {
    id: ID
    text: String
    author: CommentAuthor
    votes: CommentVotes
    timestamp: String
    urlMeta: CommentUrlMeta
  }

  extend type Query {
    getComments(url: String!): [Comment]
    topComments(minVoteSum: Int!, limit: Int!): [Comment]
    countComments(url: String!): Int
  }

  extend type Mutation {
    createComment(comment: CommentInput!): Comment
    removeCommentVote(commentId: ID): Boolean
    addCommentVoteUp(commentId: ID): Boolean
    addCommentVoteDown(commentId: ID): Boolean
  }
`;
