import { container } from "../inversify.config";
import { AuthProvider } from "./index";

const authProvider = container.get(AuthProvider);

export const authResolvers = {
  Mutation: {
    login: async (_, args, { res }) => {
      // TODO: validate CSRF?
      const sessionCookie = await authProvider.createSessionCookie(
        args.idToken
      );
      res.setHeader("Set-Cookie", sessionCookie);
      return true;
    },

    logout: async () => {
      // TODO: remove session cookie
    },
  },
};
