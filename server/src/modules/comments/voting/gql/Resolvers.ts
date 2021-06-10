import { container } from "@/inversify.config";
import { CommentVoteService } from "@/modules/comments/voting/service";
import { Unauthorized } from "@/exceptions/exceptions";
import { AuthProvider, IdToken } from "@/modules/auth";

const authProvider = container.get(AuthProvider);
const service = container.get(CommentVoteService);

export const commentVoteResolvers = {
  Mutation: {
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
