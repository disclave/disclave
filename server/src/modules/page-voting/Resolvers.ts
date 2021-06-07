import { container } from "@/inversify.config";
import { AuthProvider, DecodedIdToken, IdToken } from "@/modules/auth";
import { Unauthorized } from "@/exceptions/exceptions";
import { PageVoteService } from ".";

const authProvider = container.get(AuthProvider);
const service = container.get(PageVoteService);

export const pageVoteResolvers = {
  Mutation: {
    removePageVote: async (_, args, { idToken }: { idToken: IdToken }) => {
      if (!idToken) throw Unauthorized("You have to be authorized to vote.");
      const decodedToken = await authProvider.verifyIdToken(idToken, true);
      return await service.removeVote(args.url, decodedToken.uid);
    },
    addPageVoteUp: async (_, args, { idToken }: { idToken: IdToken }) => {
      if (!idToken) throw Unauthorized("You have to be authorized to vote.");
      const decodedToken = await authProvider.verifyIdToken(idToken, true);
      return await service.setVoteUp(args.url, decodedToken.uid);
    },
    addPageVoteDown: async (_, args, { idToken }: { idToken: IdToken }) => {
      if (!idToken) throw Unauthorized("You have to be authorized to vote.");
      const decodedToken = await authProvider.verifyIdToken(idToken, true);
      return await service.setVoteDown(args.url, decodedToken.uid);
    },
  },
};
