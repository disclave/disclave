import { Comment } from "./Comment";
import { container } from "@/inversify.config";
import { CommentService } from "./index";
import { Unauthorized } from "@/exceptions/exceptions";
import { Session } from "@/modules/auth";

const service = container.get(CommentService);

export const commentsResolvers = {
  Query: {
    getComments: async (_, args, { session }: { session: Session }) => {
      // TODO: fixme
      const comments = await service.getComments(args.url, /*session?.uid*/ "");
      return comments.map(commentToResponse);
    },
    latestComments: async (_, args, { session }: { session: Session }) => {
      // TODO: fixme
      const comments = await service.getLatestComments(
        args.minVoteSum,
        args.limit,
        /*session?.uid*/ ""
      );
      return comments.map(commentToResponse);
    },
    topComments: async (_, args, { session }: { session: Session }) => {
      // TODO: fixme
      const comments = await service.getTopComments(
        args.minVoteSum,
        args.limit,
        /*session?.uid*/ ""
      );
      return comments.map(commentToResponse);
    },
    countComments: async (_, args) => {
      return await service.countComments(args.url);
    },
  },
  // TODO: add CSRF tokens
  Mutation: {
    createComment: async (_, args, { session }: { session: Session }) => {
      if (!session)
        throw Unauthorized("You have to be authorized to create comment.");

      // TODO: fixme
      const comment = await service.addComment(
        /*session.uid*/ "",
        args.comment.text,
        args.comment.url
      );
      return commentToResponse(comment);
    },
    removeCommentVote: async (_, args, { session }: { session: Session }) => {
      if (!session) throw Unauthorized("You have to be authorized to vote.");
      // TODO: fixme
      return await service.removeVote(args.commentId, /*session.uid*/ "");
    },
    addCommentVoteUp: async (_, args, { session }: { session: Session }) => {
      if (!session) throw Unauthorized("You have to be authorized to vote.");
      // TODO: fixme
      return await service.setVoteUp(args.commentId, /*session.uid*/ "");
    },
    addCommentVoteDown: async (_, args, { session }: { session: Session }) => {
      if (!session) throw Unauthorized("You have to be authorized to vote.");
      // TODO: fixme
      return await service.setVoteDown(args.commentId, /*session.uid*/ "");
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
