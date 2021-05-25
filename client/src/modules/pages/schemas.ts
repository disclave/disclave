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
      votest {
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

export const REMOVE_PAGE_VOTE = gql`
  mutation($url: String!) {
    removePageVote(url: $url)
  }
`;

export const ADD_PAGE_VOTE_UP = gql`
  mutation($url: String!) {
    addPageVoteUp(url: $url)
  }
`;

export const ADD_PAGE_VOTE_DOWN = gql`
  mutation($url: String!) {
    addPageVoteDown(url: $url)
  }
`;
