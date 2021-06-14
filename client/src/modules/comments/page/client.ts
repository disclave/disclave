import { client, runQuery } from "../../../graphql";
import { UrlId } from "../../pages/models";
import { PageCommentModel } from "./models";
import { GET_PAGE_COMMENTS, CREATE_PAGE_COMMENT } from "./schemas";

export async function getPageComments(
  urlId: UrlId,
  noCache: boolean = false
): Promise<Array<PageCommentModel>> {
  const result = await runQuery<Array<PageCommentModel>>(
    GET_PAGE_COMMENTS,
    {
      urlId,
    },
    "getPageComments",
    noCache
  );

  return result.map(responseToModel);
}

export async function createPageComment(
  text: string,
  urlId: UrlId,
  rawUrl: string
): Promise<PageCommentModel> {
  const result = await client().mutate({
    mutation: CREATE_PAGE_COMMENT,
    variables: {
      comment: {
        text,
        urlId,
        rawUrl,
      },
    },
  });
  return responseToModel(result.data.createPageComment);
}

function responseToModel(data: any): PageCommentModel {
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
  };
}
