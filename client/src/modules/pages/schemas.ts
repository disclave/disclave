import { gql } from "@apollo/client";

export const GET_PAGE_DETAILS = gql`
  query($url: String!) {
    pageDetails(url: $url) {
      url
      pageId
      websiteId
      votes {
        sum
        votedUp
        votedDown
      }
      meta {
        logo
        title
      }
    }
  }
`;
