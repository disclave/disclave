import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query($url: String!) {
    getComments(url: $url) {
      id
      text
      author {
        id
        name
      }
      timestamp
      urlMeta {
        websiteId
        pageId
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation($comment: CommentInput!) {
    createComment(comment: $comment) {
      id
      text
      author {
        id
        name
      }
      timestamp
      urlMeta {
        websiteId
        pageId
      }
    }
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
