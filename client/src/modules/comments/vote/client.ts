import { client } from "../../../graphql";
import {
  ADD_COMMENT_VOTE_DOWN,
  ADD_COMMENT_VOTE_UP,
  REMOVE_COMMENT_VOTE,
} from "./schemas";

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
