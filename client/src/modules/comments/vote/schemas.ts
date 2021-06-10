import { gql } from "@apollo/client";

export const REMOVE_COMMENT_VOTE = gql`
  mutation($commentId: ID!) {
    removeCommentVote(commentId: $commentId)
  }
`;

export const ADD_COMMENT_VOTE_UP = gql`
  mutation($commentId: ID!) {
    addCommentVoteUp(commentId: $commentId)
  }
`;

export const ADD_COMMENT_VOTE_DOWN = gql`
  mutation($commentId: ID!) {
    addCommentVoteDown(commentId: $commentId)
  }
`;
