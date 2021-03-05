import {gql} from "apollo-server-micro"

export const typeDefs = gql`
  input CommentInput {
    text: String
    url: String
  }
  
  type CommentUrlMeta {
    websiteId: String,
    pageId: String
  }
  
  type Comment {
    id: ID
    text: String,
    timestamp: String,
    urlMeta: CommentUrlMeta
  }

  type Query {
    getComments(url: String!): [Comment]
  }
  
  type Mutation {
    createComment(comment: CommentInput!): Comment
  }
`