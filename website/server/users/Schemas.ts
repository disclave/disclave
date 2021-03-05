import {gql} from "apollo-server-micro"

export const usersTypeDefs = gql`
  input UserProfileInput {
    name: String
  }
  
  extend type Mutation {
    createUserProfile(uid: String!, profile: UserProfileInput!): ID
  }
`