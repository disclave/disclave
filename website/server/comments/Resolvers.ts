import {CommentService} from "./CommentService";
import {Comment} from "./Comment";

const service = new CommentService();

export const resolvers = {
  Query: {
    getComments: async (_, args) => {
      const comments = await service.getComments(
        args.url
      )
      return comments.map(commentToResponse)
    }
  },
  Mutation: {
    createComment: async (_, args) => {
      const comment = await service.addComment(
        args.comment.text,
        args.comment.url
      )
      return commentToResponse(comment)
    }
  }
}

const commentToResponse = (message: Comment) => {
  return {
    id: message.id,
    text: message.text,
    websiteId: message.websiteId,
    pageId: message.pageId
  }
}