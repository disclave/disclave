import { gql } from "apollo-server-micro";

export const authTypeDefs = gql`
  extend type Mutation {
    updateUserCookie: Boolean
  }
`;
