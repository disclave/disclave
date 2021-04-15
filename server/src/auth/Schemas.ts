import { gql } from "apollo-server-micro";

export const authTypeDefs = gql`
  extend type Mutation {
    login(idToken: String!): Boolean
    logout: Boolean
  }
`;
