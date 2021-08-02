import { getAuthProvider, getPageVoteService, UrlId } from "@disclave/services";
import { Unauthorized } from "@/exceptions";
import { Resolvers } from "@/graphql";

export const resolvers = (): Resolvers => {
  const authProvider = getAuthProvider();
  const service = getPageVoteService();

  return {
    Mutation: {
      removePageVote: async (_, args: { urlId: UrlId }, { idToken }) => {
        if (!idToken) throw Unauthorized("You have to be authorized to vote.");
        const decodedToken = await authProvider.verifyIdToken(idToken, true);
        return await service.removeVote(args.urlId, decodedToken.uid);
      },
      addPageVoteUp: async (_, args: { urlId: UrlId }, { idToken }) => {
        if (!idToken) throw Unauthorized("You have to be authorized to vote.");
        const decodedToken = await authProvider.verifyIdToken(idToken, true);
        return await service.setVoteUp(args.urlId, decodedToken.uid);
      },
      addPageVoteDown: async (_, args: { urlId: UrlId }, { idToken }) => {
        if (!idToken) throw Unauthorized("You have to be authorized to vote.");
        const decodedToken = await authProvider.verifyIdToken(idToken, true);
        return await service.setVoteDown(args.urlId, decodedToken.uid);
      },
    },
  };
};
