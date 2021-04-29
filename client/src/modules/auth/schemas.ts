import { gql } from "@apollo/client";

export const UPDATE_USER_COOKIE = gql`
  mutation {
    updateUserCookie
  }
`;

export const SEND_VERIFICATION_EMAIL = gql`
  mutation($redirectUrl: String) {
    sendVerificationEmail(redirectUrl: $redirectUrl)
  }
`;
