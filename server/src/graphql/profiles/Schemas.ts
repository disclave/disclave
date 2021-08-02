import { gql } from "apollo-server-express";

export const typeDefs = gql`
  input UserProfileInput {
    name: String!
  }

  type UserProfile {
    uid: ID!
    name: String!
  }

  extend type Query {
    getSelfProfile: UserProfile
  }

  extend type Mutation {
    createSelfProfile(profile: UserProfileInput!): UserProfile!
  }
`;
