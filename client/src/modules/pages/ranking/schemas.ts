import { gql } from "@apollo/client";

const defaultPageRankingResponse = `
  id
  websiteId
  pageId
  commentsCount
  url
  meta {
    logo
    title
  }
  votes {
    sum
    votedUp
    votedDown
  }
`;

export const GET_TOP_COMMENTED_PAGES = gql`
  query($params: TopCommentedPageRankingParams!) {
    topCommentedPages(params: $params) {
      ${defaultPageRankingResponse}
    }
  }
`;

export const GET_TOP_RATED_PAGES = gql`
  query($params: TopRatedPageRankingParams!) {
    topRatedPages(params: $params) {
      ${defaultPageRankingResponse}
    }
  }
`;
