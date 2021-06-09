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
  query($minCommentsVoteSum: Int!, $limit: Int!) {
    topCommentedPages(minCommentsVoteSum: $minCommentsVoteSum, limit: $limit) {
      ${defaultPageRankingResponse}
    }
  }
`;

export const GET_TOP_RATED_PAGES = gql`
  query($minVoteSum: Int!, $limit: Int!) {
    topRatedPages(minVoteSum: $minVoteSum, limit: $limit) {
      ${defaultPageRankingResponse}
    }
  }
`;
