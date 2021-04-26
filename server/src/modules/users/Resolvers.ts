import { container } from "@/inversify.config";
import { UserProfile, UserService } from "./index";
import { Unauthorized } from "@/exceptions/exceptions";
import { Session } from "@/modules/auth";

const service = container.get(UserService);

export const usersResolvers = {
  Query: {
    getSelfProfile: async (_, args, { session }: { session: Session }) => {
      if (!session)
        throw Unauthorized("You have to be authorized to get self profile.");
      // TODO: fixme
      const profile = await service.getProfile(/*session.uid*/ "");
      if (!profile) return null;
      return profileToResponse(profile);
    },
  },
  // TODO: add CSRF tokens
  Mutation: {
    createSelfProfile: async (_, args, { session }: { session: Session }) => {
      if (!session)
        throw Unauthorized("You have to be authorized to create self profile.");
      // TODO: fixme
      const profile = await service.createProfile(
        /*session.uid*/ "",
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
