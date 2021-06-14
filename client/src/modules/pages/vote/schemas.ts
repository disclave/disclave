import { gql } from "@apollo/client";

export const REMOVE_PAGE_VOTE = gql`
  mutation($urlId: UrlId!) {
    removePageVote(urlId: $urlId)
  }
`;

export const ADD_PAGE_VOTE_UP = gql`
  mutation($urlId: UrlId!) {
    addPageVoteUp(urlId: $urlId)
  }
`;

export const ADD_PAGE_VOTE_DOWN = gql`
  mutation($urlId: UrlId!) {
    addPageVoteDown(urlId: $urlId)
  }
`;
