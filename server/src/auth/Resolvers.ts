import { container } from "../inversify.config";
import { AuthProvider } from "./index";
import { setUserCookie } from "../cookies";

const authProvider = container.get(AuthProvider);

export const authResolvers = {
  Mutation: {
    updateUserCookie: async (_, args, { idToken, res }) => {
      const cookieContent = await authProvider.getUserCookieContent(idToken);
      setUserCookie(cookieContent, res);
      return true;
    },

    login: async (_, args, { res }) => {
      const sessionCookie = await authProvider.createSessionCookie(
        args.idToken
      );
      res.setHeader("Set-Cookie", sessionCookie);
      return true;
    },

    logout: async () => {
      // TODO:
    },
  },
};
