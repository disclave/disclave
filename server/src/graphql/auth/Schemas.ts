import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Mutation {
    updateUserCookie: Boolean
    sendVerificationEmail(redirectUrl: String): Boolean
  }
`;
