import { gql } from "@apollo/client";

export const GET_SELF_PROFILE = gql`
  query {
    getSelfProfile {
      uid
      name
    }
  }
`;

export const CREATE_SELF_PROFILE = gql`
  mutation($profile: UserProfileInput!) {
    createSelfProfile(profile: $profile) {
      uid
      name
    }
  }
`;
