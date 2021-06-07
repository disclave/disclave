import { client } from "../../graphql";
import {
  ADD_PAGE_VOTE_DOWN,
  ADD_PAGE_VOTE_UP,
  REMOVE_PAGE_VOTE,
} from "./schemas";

export async function removePageVote(
  websiteId: string,
  pageId: string
): Promise<boolean> {
  const result = await client().mutate({
    mutation: REMOVE_PAGE_VOTE,
    variables: {
      urlId: { websiteId, pageId },
    },
  });
  return result.data.removePageVote;
}

export async function addPageVoteUp(
  websiteId: string,
  pageId: string
): Promise<boolean> {
  const result = await client().mutate({
    mutation: ADD_PAGE_VOTE_UP,
    variables: {
      urlId: { websiteId, pageId },
    },
  });
  return result.data.addPageVoteUp;
}

export async function addPageVoteDown(
  websiteId: string,
  pageId: string
): Promise<boolean> {
  const result = await client().mutate({
    mutation: ADD_PAGE_VOTE_DOWN,
    variables: {
      urlId: { websiteId, pageId },
    },
  });
  return result.data.addPageVoteDown;
}
