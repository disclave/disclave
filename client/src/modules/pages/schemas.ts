import { gql } from "@apollo/client";

export const GET_TOP_COMMENTED_PAGES = gql`
  query($minCommentsVoteSum: Int!, $limit: Int!) {
    topCommentedPages(minCommentsVoteSum: $minCommentsVoteSum, limit: $limit) {
      id
      websiteId
      pageId
      commentsCount
    }
  }
`;

export const GET_PAGE_DETAILS = gql`
  query($url: String!, $fetchMetaIfNoCache: Boolean!) {
    pageDetails(url: $url, fetchMetaIfNoCache: $fetchMetaIfNoCache) {
      url
      pageId
      websiteId
      meta {
        logo
        title
      }
    }
  }
`;

