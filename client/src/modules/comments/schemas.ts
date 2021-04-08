import { gql } from "@apollo/client";

const defaultCommentResponseFields = `
  id
  text
  author {
    id
    name
  }
  votes {
    sum
    votedUp
    votedDown
  }
  timestamp
  urlMeta {
    websiteId
    pageId
  }
`;

export const GET_COMMENTS = gql`
  query($url: String!) {
    getComments(url: $url) { ${defaultCommentResponseFields} }
  }
`;

export const CREATE_COMMENT = gql`
  mutation($comment: CommentInput!) {
    createComment(comment: $comment) { ${defaultCommentResponseFields} }
  }
`;

export const REMOVE_COMMENT_VOTE = gql`
  mutation(commentId: ID) { removeCommentVote(commentId: commentId) }
`;

export const ADD_COMMENT_VOTE_UP = gql`
  mutation(commentId: ID) { addCommentVoteUp(commentId: commentId) }
`;

export const ADD_COMMENT_VOTE_DOWN = gql`
  mutation(commentId: ID) { addCommentVoteDown(commentId: commentId) }
`;
