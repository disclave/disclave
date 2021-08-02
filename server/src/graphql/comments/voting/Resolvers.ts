import { Unauthorized } from "@/exceptions";
import { Resolvers } from "@/graphql";
import { getAuthProvider, getCommentVoteService } from "@disclave/services";

export const resolvers = (): Resolvers => {
  const authProvider = getAuthProvider();
  const service = getCommentVoteService();

  return {
    Mutation: {
      removeCommentVote: async (
        _,
        args: { commentId: string },
        { idToken }
      ) => {
        if (!idToken) throw Unauthorized("You have to be authorized to vote.");
        const decodedToken = await authProvider.verifyIdToken(idToken, true);
        return await service.removeVote(args.commentId, decodedToken.uid);
      },
      addCommentVoteUp: async (_, args: { commentId: string }, { idToken }) => {
        if (!idToken) throw Unauthorized("You have to be authorized to vote.");
        const decodedToken = await authProvider.verifyIdToken(idToken, true);
        return await service.setVoteUp(args.commentId, decodedToken.uid);
      },
      addCommentVoteDown: async (
        _,
        args: { commentId: string },
        { idToken }
      ) => {
        if (!idToken) throw Unauthorized("You have to be authorized to vote.");
        const decodedToken = await authProvider.verifyIdToken(idToken, true);
        return await service.setVoteDown(args.commentId, decodedToken.uid);
      },
    },
  };
};
