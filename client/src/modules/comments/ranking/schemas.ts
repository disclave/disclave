import { gql } from "@apollo/client";

const rankingCommentsReponse = `
  id
  text
  author {
    name
  }
  votes {
    sum
    votedUp
    votedDown
  }
  timestamp
  page {
    websiteId
    pageId
    meta {
      logo
      title
    }
  }
`;

export const GET_LATEST_COMMENTS_RANKING = gql`
  query($minVoteSum: Int!, $limit: Int!) {
    latestCommentsRanking(minVoteSum: $minVoteSum, limit: $limit) { ${rankingCommentsReponse} }
  }
`;

export const GET_TOP_COMMENTS_RANKING = gql`
  query($minVoteSum: Int!, $limit: Int!) {
    topCommentsRanking(minVoteSum: $minVoteSum, limit: $limit) { ${rankingCommentsReponse} }
  }
`;
