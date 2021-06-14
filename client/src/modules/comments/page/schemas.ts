import { gql } from "@apollo/client";

const pageCommentResponse = `
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
`;

export const GET_PAGE_COMMENTS = gql`
  query($urlId: UrlId!) {
    getPageComments(urlId: $urlId) { ${pageCommentResponse} }
  }
`;

export const CREATE_PAGE_COMMENT = gql`
  mutation($comment: PageCommentInput!) {
    createPageComment(comment: $comment) { ${pageCommentResponse} }
  }
`;
