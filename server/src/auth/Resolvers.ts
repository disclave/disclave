import { container } from "../inversify.config";
import { AuthProvider } from "./index";
import { Session } from "./Session";
import { buildExpiredSessionCookie, buildSessionCookie } from "../cookies";

const authProvider = container.get(AuthProvider);

export const authResolvers = {
  Query: {
    session: async (_, args, { sessionCookie }) => {
      if (!sessionCookie) return null;

      const session = await authProvider.getSession(sessionCookie);
      return sessionToResponse(session);
    },
  },
  Mutation: {
    login: async (_, args, { res }) => {
      // TODO: validate CSRF?
      const { content, expiresIn } = await authProvider.createSessionCookie(
        args.idToken
      );
      const sessionCookie = buildSessionCookie(content, expiresIn);
      res.setHeader("Set-Cookie", sessionCookie);

      const session = await authProvider.getSession(content);
      return sessionToResponse(session);
    },

    logout: async (_, args, { res }) => {
      const sessionCookie = buildExpiredSessionCookie();
      res.setHeader("Set-Cookie", sessionCookie);
      return true;
    },
  },
};

const sessionToResponse = (session: Session) => {
  return {
    uid: session.uid,
    email: session.email,
    emailVerified: session.emailVerified,
    profile: session.profile
      ? {
          uid: session.profile.uid,
          name: session.profile.name,
        }
      : null,
  };
};
