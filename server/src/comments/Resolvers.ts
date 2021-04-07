import { Comment } from "./Comment";
import { container } from "../inversify.config";
import { CommentService } from "./index";

const service = container.get(CommentService);

export const commentsResolvers = {
  Query: {
    getComments: async (_, args) => {
      const comments = await service.getComments(args.url);
      return comments.map(commentToResponse);
    },
    countComments: async (_, args) => {
      return await service.countComments(args.url);
    },
  },
  Mutation: {
    createComment: async (_, args, context) => {
      if (!context.idToken) throw "Unauthorized";

      const comment = await service.addComment(
        context.idToken,
        args.comment.text,
        args.comment.url
      );
      return commentToResponse(comment);
    },
    removeCommentVote: async (_, args, context) => {
      if (!context.idToken) throw "Unauthorized";

      return await service.removeVote(args.commentId, context.idToken);
    },
    addCommentVoteUp: async (_, args, context) => {
      if (!context.idToken) throw "Unauthorized";

      return await service.setVoteUp(args.commentId, context.idToken);
    },
    addCommentVoteDown: async (_, args, context) => {
      if (!context.idToken) throw "Unauthorized";

      return await service.setVoteDown(args.commentId, context.idToken);
    },
  },
};

const commentToResponse = (message: Comment) => {
  return {
    id: message.id,
    text: message.text,
    author: {
      id: message.author.id,
      name: message.author.name,
    },
    timestamp: message.timestamp,
    urlMeta: {
      websiteId: message.urlMeta.websiteId,
      pageId: message.urlMeta.pageId,
    },
  };
};
