import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation($idToken: String!) {
    login(idToken: $idToken)
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;
