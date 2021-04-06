import { container } from "../inversify.config";
import { AuthProvider } from "./index";

const authProvider = container.get(AuthProvider);

const userCookieName = "DISCLAVE_USER";

export const authResolvers = {
  Mutation: {
    updateUserCookie: async (_, args, { idToken, res }) => {
      const cookieContent = await authProvider.getUserCookieContent(idToken);

      if (!cookieContent) {
        res.cookies.set(userCookieName, { maxAge: 0 });
      } else {
        res.cookie(userCookieName, JSON.stringify(cookieContent), {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
        });
      }

      return true;
    },
  },
};
