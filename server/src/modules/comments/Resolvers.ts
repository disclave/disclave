import { Comment } from "./Comment";
import { container } from "@/inversify.config";
import { CommentService } from "./index";
import { AuthProvider } from "@/modules/auth";

const authProvider = container.get(AuthProvider);
const service = container.get(CommentService);

const parseSessionCookie = async (
  sessionCookie: string | null,
  throwOnInvalid: boolean = true
) => {
  if (!sessionCookie) return null;

  try {
    return authProvider.verifySessionCookie(sessionCookie, false);
  } catch (e) {
    if (throwOnInvalid) throw e;
  }
  return null;
};

export const commentsResolvers = {
  Query: {
    getComments: async (_, args, { sessionCookie }) => {
      const userData = await parseSessionCookie(sessionCookie, false);
      const comments = await service.getComments(args.url, userData?.uid);
      return comments.map(commentToResponse);
    },
    latestComments: async (_, args, { sessionCookie }) => {
      const userData = await parseSessionCookie(sessionCookie, false);
      const comments = await service.getLatestComments(
        args.minVoteSum,
        args.limit,
        userData?.uid
      );
      return comments.map(commentToResponse);
    },
    topComments: async (_, args, { sessionCookie }) => {
      const userData = await parseSessionCookie(sessionCookie, false);
      const comments = await service.getTopComments(
        args.minVoteSum,
        args.limit,
        userData?.uid
      );
      return comments.map(commentToResponse);
    },
    countComments: async (_, args) => {
      return await service.countComments(args.url);
    },
  },
  // TODO: add CSRF tokens
  Mutation: {
    createComment: async (_, args, { sessionCookie }) => {
      const userData = await parseSessionCookie(sessionCookie, true);
      if (!userData) throw "Unauthorized";

      const comment = await service.addComment(
        userData.uid,
        args.comment.text,
        args.comment.url
      );
      return commentToResponse(comment);
    },
    removeCommentVote: async (_, args, { sessionCookie }) => {
      const userData = await parseSessionCookie(sessionCookie, true);
      if (!userData) throw "Unauthorized";

      return await service.removeVote(args.commentId, userData.uid);
    },
    addCommentVoteUp: async (_, args, { sessionCookie }) => {
      const userData = await parseSessionCookie(sessionCookie, true);
      if (!userData) throw "Unauthorized";

      return await service.setVoteUp(args.commentId, userData.uid);
    },
    addCommentVoteDown: async (_, args, { sessionCookie }) => {
      const userData = await parseSessionCookie(sessionCookie, true);
      if (!userData) throw "Unauthorized";

      return await service.setVoteDown(args.commentId, userData.uid);
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
