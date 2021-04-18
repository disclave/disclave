import { container } from "../inversify.config";
import { UserProfile, UserService } from "./index";
import { AuthProvider } from "../auth";

const authProvider = container.get(AuthProvider);
const service = container.get(UserService);

export const usersResolvers = {
  Query: {
    getSelfProfile: async (_, args, { sessionCookie }) => {
      const userData = await authProvider.verifySessionCookie(
        sessionCookie,
        false
      );
      if (!userData) throw "Unauthorized";
      const profile = await service.getProfile(userData.uid);
      if (!profile) return null;
      return profileToResponse(profile);
    },
  },
  // TODO: add CSRF tokens
  Mutation: {
    createSelfProfile: async (_, args, { sessionCookie }) => {
      const userData = await authProvider.verifySessionCookie(
        sessionCookie,
        true
      );
      if (!userData) throw "Unauthorized";
      const profile = await service.createProfile(
        userData.uid,
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
