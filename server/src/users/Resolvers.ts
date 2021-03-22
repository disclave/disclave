import { container } from "../inversify.config";
import { UserProfile, UserService } from "./index";

const service = container.get(UserService);

export const usersResolvers = {
  Query: {
    getSelfProfile: async (_, args, context) => {
      if (!context.idToken) throw "Unauthorized";
      const profile = await service.getProfile(context.idToken);
      return profileToResponse(profile);
    },
  },
  Mutation: {
    createSelfProfile: async (_, args, context) => {
      if (!context.idToken) throw "Unauthorized";
      const profile = await service.createProfile(
        context.idToken,
        args.profile.name
      );
      return profileToResponse(profile);
    },
  },
};

const profileToResponse = (profile: UserProfile) => {
  return {
    uid: profile.id,
    name: profile.name,
  };
};
