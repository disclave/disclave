import {client} from "../graphql/Client";
import {CommentModel} from "./CommentModel";
import {gql} from "@apollo/client";

export const getComments = async (url: string): Promise<Array<CommentModel>> => {
  const result = await client.query({
    query: GET_COMMENTS,
    variables: {
      url
    }
  })
  return result.data.getComments.map(responseToModel)
}

export const createComment = async (text: string, url: string): Promise<CommentModel> => {
  const result = await client.mutate({
    mutation: CREATE_COMMENT,
    variables: {
      comment: {
        text,
        url
      }
    }
  })
  return responseToModel(result.data.createComment)
}

const responseToModel = (data: any): CommentModel => {
  return {
    id: data.id,
    text: data.text,
    websiteId: data.websiteId,
    pageId: data.pageId
  }
}

const GET_COMMENTS = gql`
  query($url: String!) {
    getComments(url: $url) {
      id
      text
      websiteId
      pageId
    }
  }
`

const CREATE_COMMENT = gql`
  mutation($comment: CommentInput!) {
    createComment(comment: $comment) {
      id
      text
      websiteId
      pageId
    }
  }
`