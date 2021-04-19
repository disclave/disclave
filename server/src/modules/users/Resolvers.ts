import { container } from "@/inversify.config";
import { UserProfile, UserService } from "./index";
import { AuthProvider, DecodedIdToken } from "../auth";
import { Unauthorized } from "@/exceptions/exceptions";

const service = container.get(UserService);

export const usersResolvers = {
  Query: {
    getSelfProfile: async (
      _,
      args,
      { session }: { session: DecodedIdToken }
    ) => {
      if (!session)
        throw Unauthorized("You have to be authorized to get self profile.");
      const profile = await service.getProfile(session.uid);
      if (!profile) return null;
      return profileToResponse(profile);
    },
  },
  // TODO: add CSRF tokens
  Mutation: {
    createSelfProfile: async (
      _,
      args,
      { session }: { session: DecodedIdToken }
    ) => {
      if (!session)
        throw Unauthorized("You have to be authorized to create self profile.");
      const profile = await service.createProfile(
        session.uid,
        args.profile.name
      );

      return profileToResponse(profile);
    },
  },
};

const profileToResponse = (profile: UserProfile) => {
  return {
    uid: profile.uid,
    name: profile.name,
  };
};
