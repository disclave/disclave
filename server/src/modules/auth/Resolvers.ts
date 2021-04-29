import { container } from "@/inversify.config";
import { AuthProvider, DecodedIdToken, IdToken } from "./index";
import { setUserCookie } from "@/cookies";
import { EmailService } from "@/modules/email";
import { Unauthorized } from "@/exceptions/exceptions";

const authProvider = container.get(AuthProvider);
const emailService = container.get(EmailService);

export const authResolvers = {
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
