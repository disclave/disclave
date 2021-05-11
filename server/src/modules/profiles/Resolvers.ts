import { container } from "@/inversify.config";
import { Profile, ProfileService } from "./index";
import { Unauthorized } from "@/exceptions/exceptions";
import { AuthProvider, DecodedIdToken, IdToken } from "@/modules/auth";

const authProvider = container.get(AuthProvider);
const service = container.get(ProfileService);

export const usersResolvers = {
  Query: {
    getSelfProfile: async (
      _,
      args,
      { decodedToken }: { decodedToken: DecodedIdToken }
    ) => {
      if (!decodedToken)
        throw Unauthorized("You have to be authorized to get self profile.");
      const profile = await service.getProfile(decodedToken.uid);
      if (!profile) return null;
      return profileToResponse(profile);
    },
  },
  Mutation: {
    createSelfProfile: async (_, args, { idToken }: { idToken: IdToken }) => {
      if (!idToken)
        throw Unauthorized("You have to be authorized to create self profile.");
      const decodedToken = await authProvider.verifyIdToken(idToken, true); // check if not revoked
      const profile = await service.createProfile(
        decodedToken.uid,
        args.profile.name
      );

      return profileToResponse(profile);
    },
  },
};

const profileToResponse = (profile: Profile) => {
  return {
    uid: profile.uid,
    name: profile.name,
  };
};
