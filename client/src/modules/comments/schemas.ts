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
