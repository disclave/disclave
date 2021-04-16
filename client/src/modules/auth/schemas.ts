import { gql } from "@apollo/client";

const sessionFields = `
  uid
  email
  emailVerified
  profile {
    uid
    name
  }
`;

export const GET_SESSION = gql`
  query {
    session {
      ${sessionFields}
    }
  }
`;

export const LOGIN = gql`
  mutation($idToken: String!) {
    login(idToken: $idToken) {
      ${sessionFields}
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;
