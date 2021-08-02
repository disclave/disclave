import {
  IdToken,
  getAuthProvider,
  getPageVoteService,
} from "@disclave/services";
import { Unauthorized } from "@/exceptions";

export const resolvers = () => {
  const authProvider = getAuthProvider();
  const service = getPageVoteService();

  return {
    Mutation: {
      removePageVote: async (_, args, { idToken }: { idToken: IdToken }) => {
        if (!idToken) throw Unauthorized("You have to be authorized to vote.");
        const decodedToken = await authProvider.verifyIdToken(idToken, true);
        return await service.removeVote(args.urlId, decodedToken.uid);
      },
      addPageVoteUp: async (_, args, { idToken }: { idToken: IdToken }) => {
        if (!idToken) throw Unauthorized("You have to be authorized to vote.");
        const decodedToken = await authProvider.verifyIdToken(idToken, true);
        return await service.setVoteUp(args.urlId, decodedToken.uid);
      },
      addPageVoteDown: async (_, args, { idToken }: { idToken: IdToken }) => {
        if (!idToken) throw Unauthorized("You have to be authorized to vote.");
        const decodedToken = await authProvider.verifyIdToken(idToken, true);
        return await service.setVoteDown(args.urlId, decodedToken.uid);
      },
    },
  };
};
