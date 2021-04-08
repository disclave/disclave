import { client } from "../../graphql";
import { CommentModel } from "./";
import {
  ADD_COMMENT_VOTE_DOWN,
  ADD_COMMENT_VOTE_UP,
  CREATE_COMMENT,
  GET_COMMENTS,
  REMOVE_COMMENT_VOTE,
} from "./schemas";

export const getComments = async (
  url: string
): Promise<Array<CommentModel>> => {
  const result = await client().query({
    query: GET_COMMENTS,
    variables: {
      url,
    },
  });
  return result.data.getComments.map(responseToModel);
};

export const createComment = async (
  text: string,
  url: string
): Promise<CommentModel> => {
  const result = await client().mutate({
    mutation: CREATE_COMMENT,
    variables: {
      comment: {
        text,
        url,
      },
    },
  });
  return responseToModel(result.data.createComment);
};

export const removeCommentVote = async (
  commentId: string
): Promise<boolean> => {
  const result = await client().mutate({
    mutation: REMOVE_COMMENT_VOTE,
    variables: {
      commentId: commentId,
    },
  });
  return result.data.removeCommentVote;
};

export const addCommentVoteUp = async (commentId: string): Promise<boolean> => {
  const result = await client().mutate({
    mutation: ADD_COMMENT_VOTE_UP,
    variables: {
      commentId: commentId,
    },
  });
  return result.data.addCommentVoteUp;
};

export const addCommentVoteDown = async (
  commentId: string
): Promise<boolean> => {
  const result = await client().mutate({
    mutation: ADD_COMMENT_VOTE_DOWN,
    variables: {
      commentId: commentId,
    },
  });
  return result.data.addCommentVoteDown;
};

const responseToModel = (data: any): CommentModel => {
  return {
    id: data.id,
    text: data.text,
    author: {
      id: data.author.id,
      name: data.author.name,
    },
    timestamp: data.timestamp,
    urlMeta: {
      websiteId: data.urlMeta.websiteId,
      pageId: data.urlMeta.pageId,
    },
  };
};
