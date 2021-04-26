import { initFirebase } from "@/connectors/firebase/firebase";
import { container } from "./inversify.config";
import { CommentService } from "@/modules/comments";
import { initDatabase } from "@/connectors/mongodb";
import { AuthProvider } from "@/modules/auth";
import { EmailTemplate, initMailjet } from "@/connectors/mailjet";
import { EmailService } from "@/modules/email";

export interface DbConfig {
  dbUri: string;
  dbName: string;
}

export interface MailjetConfig {
  apiKey: string;
  apiSecret: string;
  templates: {
    authVerificationCode: string;
  };
}

export const init = async (
  firebaseServiceAccountObject: Object,
  dbConfig: DbConfig,
  mjConfig: MailjetConfig
) => {
  const emailTemplates = new Map<EmailTemplate, number>();
  emailTemplates.set(
    EmailTemplate.AUTH_VERIFICATION_CODE,
    Number(mjConfig.templates.authVerificationCode)
  );

  initMailjet(mjConfig.apiKey, mjConfig.apiSecret, emailTemplates);
  initFirebase(firebaseServiceAccountObject);
  await initDatabase(dbConfig.dbUri, dbConfig.dbName);
};

export { graphqlHandler } from "./graphql";

export { getSessionCookie } from "./cookies";

export const getEmailService = () => container.get(EmailService);
export const getAuthProvider = () => container.get(AuthProvider);
export const getCommentService = () => container.get(CommentService);
