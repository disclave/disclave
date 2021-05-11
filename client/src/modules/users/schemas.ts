import { gql } from "@apollo/client";

export const GET_SELF_PROFILE = gql`
  query {
    getSelfProfile {
      name
    }
  }
`;

export const CREATE_SELF_PROFILE = gql`
  mutation($profile: UserProfileInput!) {
    createSelfProfile(profile: $profile) {
      name
    }
  }
`;
