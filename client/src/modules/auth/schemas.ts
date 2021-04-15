import { gql } from "@apollo/client";

export const UPDATE_USER_COOKIE = gql`
  mutation {
    updateUserCookie
  }
`;

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
