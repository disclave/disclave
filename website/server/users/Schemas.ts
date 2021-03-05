import {gql} from "apollo-server-micro"

export const typeDefs = gql`
  input UserProfileInput {
    name: String
  }
  
  type Mutation {
    createUserProfile(uid: String!, profile: UserProfileInput!)
  }
`