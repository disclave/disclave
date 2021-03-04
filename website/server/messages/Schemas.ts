import {gql} from "apollo-server-micro"

export const typeDefs = gql`
    type  Message {
        id: ID
        text: String
        websiteId: String,
        pageId: String
    }

    type  Query {
        getMessages(websiteId: String!, pageId: String!): [Message]
    }`