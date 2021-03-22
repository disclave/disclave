import { gql } from "apollo-server-micro";

export const usersTypeDefs = gql`
  input UserProfileInput {
    name: String
  }

  type UserProfile {
    uid: ID
    name: String
  }

  extend type Query {
    getSelfProfile: UserProfile
  }

  extend type Mutation {
    createSelfProfile(profile: UserProfileInput!): UserProfile
  }
`;
