import { Unauthorized } from "@/exceptions";
import {
  IdToken,
  getAuthProvider,
  getCommentVoteService,
} from "@disclave/services";

export const resolvers = () => {
  const authProvider = getAuthProvider();
  const service = getCommentVoteService();

  return {
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
      addCommentVoteDown: async (
        _,
        args,
        { idToken }: { idToken: IdToken }
      ) => {
        if (!idToken) throw Unauthorized("You have to be authorized to vote.");
        const decodedToken = await authProvider.verifyIdToken(idToken, true);
        return await service.setVoteDown(args.commentId, decodedToken.uid);
      },
    },
  };
};
