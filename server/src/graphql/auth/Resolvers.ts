import {
  getAuthProvider,
  getEmailService,
  DecodedIdToken,
  IdToken,
} from "@disclave/services";
import { setUserCookie } from "@/cookies";
import { Unauthorized } from "@/exceptions";

export const resolvers = () => {
  const authProvider = getAuthProvider();
  const emailService = getEmailService();

  return {
    Mutation: {
      updateUserCookie: async (_, args, { idToken, res }) => {
        const cookieContent = await authProvider.getUserCookieContent(idToken);
        setUserCookie(cookieContent, res);
        return true;
      },
      sendVerificationEmail: async (
        _,
        args,
        { decodedToken }: { decodedToken: DecodedIdToken }
      ) => {
        if (!decodedToken)
          throw Unauthorized("You have to be authorized to create comment.");
        const link = await authProvider.generateEmailVerificationLink(
          decodedToken.email,
          args.redirectUrl
        );
        await emailService.sendEmailVerification(decodedToken.email, link);
        return true;
      },
    },
  };
};
