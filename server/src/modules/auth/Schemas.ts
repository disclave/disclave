import { gql } from "apollo-server-micro";

export const authTypeDefs = gql`
  type Session {
    uid: ID
    email: String
    emailVerified: Boolean
    profile: UserProfile
  }

  extend type Query {
    session: Session
  }

  extend type Mutation {
    login(idToken: String!): Session
    sendVerificationEmail(redirectUrl: String): Boolean
    logout: Boolean
  }
`;
