import { client } from "../../graphql";
import { UrlId } from "../pages/models";
import {
  ADD_PAGE_VOTE_DOWN,
  ADD_PAGE_VOTE_UP,
  REMOVE_PAGE_VOTE,
} from "./schemas";

export async function removePageVote(urlId: UrlId): Promise<boolean> {
  const result = await client().mutate({
    mutation: REMOVE_PAGE_VOTE,
    variables: {
      urlId,
    },
  });
  return result.data.removePageVote;
}

export async function addPageVoteUp(urlId: UrlId): Promise<boolean> {
  const result = await client().mutate({
    mutation: ADD_PAGE_VOTE_UP,
    variables: {
      urlId,
    },
  });
  return result.data.addPageVoteUp;
}

export async function addPageVoteDown(urlId: UrlId): Promise<boolean> {
  const result = await client().mutate({
    mutation: ADD_PAGE_VOTE_DOWN,
    variables: {
      urlId,
    },
  });
  return result.data.addPageVoteDown;
}
