import { gql } from "@apollo/client";

export const CREATE_SELF_PROFILE = gql`
  mutation($profile: UserProfileInput!) {
    createSelfProfile(profile: $profile) {
      name
    }
  }
`;
