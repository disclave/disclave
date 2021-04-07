import { Comment } from "./Comment";
import { container } from "../inversify.config";
import { CommentService } from "./index";

const service = container.get(CommentService);

export const commentsResolvers = {
  Query: {
    getComments: async (_, args, context) => {
      const comments = await service.getComments(args.url, context.idToken);
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

const commentToResponse = (comment: Comment) => {
  return {
    id: comment.id,
    text: comment.text,
    author: {
      id: comment.author.id,
      name: comment.author.name,
    },
    votes: {
      sum: comment.votes.sum,
      votedUp: comment.votes.votedUp,
      votedDown: comment.votes.votedDown,
    },
    timestamp: comment.timestamp,
    urlMeta: {
      websiteId: comment.urlMeta.websiteId,
      pageId: comment.urlMeta.pageId,
    },
  };
};
