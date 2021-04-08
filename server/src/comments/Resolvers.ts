import { Comment } from "./Comment";
import { container } from "../inversify.config";
import { CommentService } from "./index";
import { AuthProvider } from "../auth";

const authProvider = container.get(AuthProvider);
const service = container.get(CommentService);

const parseIdToken = async (
  idToken: string | null,
  throwOnInvalid: boolean = true
) => {
  if (!idToken) return null;

  try {
    return authProvider.verifyIdToken(idToken, false);
  } catch (e) {
    if (throwOnInvalid) throw e;
  }
  return null;
};

export const commentsResolvers = {
  Query: {
    getComments: async (_, args, { idToken }) => {
      const userData = await parseIdToken(idToken, false);
      const comments = await service.getComments(args.url, userData?.uid);
      return comments.map(commentToResponse);
    },
    countComments: async (_, args) => {
      return await service.countComments(args.url);
    },
  },
  Mutation: {
    createComment: async (_, args, { idToken }) => {
      if (!idToken) throw "Unauthorized";

      const comment = await service.addComment(
        idToken,
        args.comment.text,
        args.comment.url
      );
      return commentToResponse(comment);
    },
    removeCommentVote: async (_, args, { idToken }) => {
      if (!idToken) throw "Unauthorized";
      const userData = await parseIdToken(idToken);

      return await service.removeVote(args.commentId, userData.uid);
    },
    addCommentVoteUp: async (_, args, { idToken }) => {
      if (!idToken) throw "Unauthorized";
      const userData = await parseIdToken(idToken);

      return await service.setVoteUp(args.commentId, userData.uid);
    },
    addCommentVoteDown: async (_, args, { idToken }) => {
      if (!idToken) throw "Unauthorized";
      const userData = await parseIdToken(idToken);

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
