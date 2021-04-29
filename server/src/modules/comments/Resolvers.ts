import { Comment } from "./Comment";
import { container } from "@/inversify.config";
import { CommentService } from "./index";
import { Unauthorized } from "@/exceptions/exceptions";
import { AuthProvider, DecodedIdToken, IdToken } from "@/modules/auth";

const authProvider = container.get(AuthProvider);
const service = container.get(CommentService);

export const commentsResolvers = {
  Query: {
    getComments: async (
      _,
      args,
      { decodedToken }: { decodedToken: DecodedIdToken }
    ) => {
      const comments = await service.getComments(args.url, decodedToken?.uid);
      return comments.map(commentToResponse);
    },
    latestComments: async (
      _,
      args,
      { decodedToken }: { decodedToken: DecodedIdToken }
    ) => {
      const comments = await service.getLatestComments(
        args.minVoteSum,
        args.limit,
        decodedToken?.uid
      );
      return comments.map(commentToResponse);
    },
    topComments: async (
      _,
      args,
      { decodedToken }: { decodedToken: DecodedIdToken }
    ) => {
      const comments = await service.getTopComments(
        args.minVoteSum,
        args.limit,
        decodedToken?.uid
      );
      return comments.map(commentToResponse);
    },
    countComments: async (_, args) => {
      return await service.countComments(args.url);
    },
  },
  Mutation: {
    createComment: async (_, args, { idToken }: { idToken: IdToken }) => {
      if (!idToken)
        throw Unauthorized("You have to be authorized to create comment.");
      const decodedToken = await authProvider.verifyIdToken(idToken, true);
      const comment = await service.addComment(
        decodedToken.uid,
        args.comment.text,
        args.comment.url
      );
      return commentToResponse(comment);
    },
    removeCommentVote: async (_, args, { idToken }: { idToken: IdToken }) => {
      if (!idToken) throw Unauthorized("You have to be authorized to vote.");
      const decodedToken = await authProvider.verifyIdToken(idToken, true);
      return await service.removeVote(args.commentId, decodedToken.uid);
    },
    addCommentVoteUp: async (_, args, { idToken }: { idToken: IdToken }) => {
      if (!idToken) throw Unauthorized("You have to be authorized to vote.");
      const decodedToken = await authProvider.verifyIdToken(idToken, true);
      return await service.setVoteUp(args.commentId, decodedToken.uid);
    },
    addCommentVoteDown: async (_, args, { idToken }: { idToken: IdToken }) => {
      if (!idToken) throw Unauthorized("You have to be authorized to vote.");
      const decodedToken = await authProvider.verifyIdToken(idToken, true);
      return await service.setVoteDown(args.commentId, decodedToken.uid);
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
