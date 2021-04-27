import { container } from "@/inversify.config";
import { Profile, ProfileService } from "./index";
import { Unauthorized } from "@/exceptions/exceptions";
import { Session } from "@/modules/auth";

const service = container.get(ProfileService);

export const usersResolvers = {
  Query: {
    getSelfProfile: async (_, args, { session }: { session: Session }) => {
      if (!session)
        throw Unauthorized("You have to be authorized to get self profile.");
      const profile = await service.getProfile(session.uid);
      if (!profile) return null;
      return profileToResponse(profile);
    },
  },
  // TODO: add CSRF tokens
  Mutation: {
    createSelfProfile: async (_, args, { session }: { session: Session }) => {
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

const profileToResponse = (profile: Profile) => {
  return {
    uid: profile.uid,
    name: profile.name,
  };
};
