import {gql} from "apollo-server-micro"

export const typeDefs = gql`
  input MessageInput {
    text: String
    url: String
  }
  
  type  Message {
    id: ID
    text: String
    websiteId: String
    pageId: String
  }

  type  Query {
    getMessages(url: String!): [Message]
  }
  
  type Mutation {
    createMessage(message: MessageInput!): Message
  }
`