import { client } from "../../graphql";
import { CommentModel } from "./";
import { CREATE_COMMENT, GET_COMMENTS } from "./schemas";

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
