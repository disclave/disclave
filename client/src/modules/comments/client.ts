import { client, runQuery } from "../../graphql";
import { UrlId } from "../pages/models";
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

export async function getComments(
  urlId: UrlId,
  noCache: boolean = false
): Promise<Array<CommentModel>> {
  const result = await runQuery<Array<CommentModel>>(
    GET_COMMENTS,
    {
      urlId,
    },
    "getComments",
    noCache
  );

  return result.map(responseToModel);
}

export async function getLatestComments(
  minVoteSum: number,
  limit: number,
  noCache: boolean = false
): Promise<Array<CommentModel>> {
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
}

export async function getTopComments(
  minVoteSum: number,
  limit: number,
  noCache: boolean = false
): Promise<Array<CommentModel>> {
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
}

export async function createComment(
  text: string,
  urlId: UrlId,
  rawUrl: string
): Promise<CommentModel> {
  const result = await client().mutate({
    mutation: CREATE_COMMENT,
    variables: {
      comment: {
        text,
        urlId,
        rawUrl,
      },
    },
  });
  return responseToModel(result.data.createComment);
}

export async function removeCommentVote(commentId: string): Promise<boolean> {
  const result = await client().mutate({
    mutation: REMOVE_COMMENT_VOTE,
    variables: {
      commentId: commentId,
    },
  });
  return result.data.removeCommentVote;
}

export async function addCommentVoteUp(commentId: string): Promise<boolean> {
  const result = await client().mutate({
    mutation: ADD_COMMENT_VOTE_UP,
    variables: {
      commentId: commentId,
    },
  });
  return result.data.addCommentVoteUp;
}

export async function addCommentVoteDown(commentId: string): Promise<boolean> {
  const result = await client().mutate({
    mutation: ADD_COMMENT_VOTE_DOWN,
    variables: {
      commentId: commentId,
    },
  });
  return result.data.addCommentVoteDown;
}

function responseToModel(data: any): CommentModel {
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
}
