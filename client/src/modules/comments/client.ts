import { client, runQuery } from "../../graphql";
import { CommentModel } from "./";
import {
  ADD_COMMENT_VOTE_DOWN,
  ADD_COMMENT_VOTE_UP,
  CREATE_COMMENT,
  GET_COMMENTS,
  GET_LATEST_COMMENTS,
  GET_TOP_COMMENTS,
  REMOVE_COMMENT_VOTE,
} from "./schemas";

export const getComments = async (
  url: string,
  noCache: boolean = false
): Promise<Array<CommentModel>> => {
  const result = await runQuery<Array<CommentModel>>(
    GET_COMMENTS,
    {
      url,
    },
    "getComments",
    noCache
  );

  return result.map(responseToModel);
};

export const getLatestComments = async (
  minVoteSum: number,
  limit: number,
  noCache: boolean = false
): Promise<Array<CommentModel>> => {
  const result = await runQuery<Array<CommentModel>>(
    GET_LATEST_COMMENTS,
    {
      minVoteSum,
      limit,
    },
    "latestComments",
    noCache
  );
  return result.map(responseToModel);
};

export const getTopComments = async (
  minVoteSum: number,
  limit: number,
  noCache: boolean = false
): Promise<Array<CommentModel>> => {
  const result = await runQuery<Array<CommentModel>>(
    GET_TOP_COMMENTS,
    {
      minVoteSum,
      limit,
    },
    "topComments",
    noCache
  );
  return result.map(responseToModel);
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
      name: data.author.name,
    },
    votes: {
      sum: data.votes.sum,
      votedUp: data.votes.votedUp,
      votedDown: data.votes.votedDown,
    },
    timestamp: data.timestamp,
    urlMeta: {
      websiteId: data.urlMeta.websiteId,
      pageId: data.urlMeta.pageId,
    },
  };
};
