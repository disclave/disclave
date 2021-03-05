import {gql} from "apollo-server-micro"

export const commentsTypeDefs = gql`
  input CommentInput {
    text: String
    url: String
  }
  
  type CommentUrlMeta {
    websiteId: String,
    pageId: String
  }
  
  type CommentAuthor {
    id: ID,
    name: String
  }
  
  type Comment {
    id: ID
    text: String,
    author: CommentAuthor,
    timestamp: String,
    urlMeta: CommentUrlMeta
  }

  extend type Query {
    getComments(url: String!): [Comment]
  }
  
  extend type Mutation {
    createComment(comment: CommentInput!): Comment
  }
`