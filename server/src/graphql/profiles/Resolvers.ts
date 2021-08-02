import {
  getAuthProvider,
  getProfileService,
  Profile,
} from "@disclave/services";
import { Unauthorized } from "@/exceptions";
import { Resolvers } from "@/graphql";

export const resolvers = (): Resolvers => {
  const authProvider = getAuthProvider();
  const service = getProfileService();

  return {
    Query: {
      getSelfProfile: async (_, {}, { decodedToken }) => {
        if (!decodedToken)
          throw Unauthorized("You have to be authorized to get self profile.");
        const profile = await service.getProfile(decodedToken.uid);
        if (!profile) return null;
        return profileToResponse(profile);
      },
    },
    Mutation: {
      createSelfProfile: async (
        _,
        args: { profile: { name: string } },
        { idToken }
      ) => {
        if (!idToken)
          throw Unauthorized(
            "You have to be authorized to create self profile."
          );
        const decodedToken = await authProvider.verifyIdToken(idToken, true); // check if not revoked
        const profile = await service.createProfile(
          decodedToken.uid,
          args.profile.name
        );

        return profileToResponse(profile);
      },
    },
  };
};

function profileToResponse(profile: Profile) {
  return {
    uid: profile.uid,
    name: profile.name,
  };
}
