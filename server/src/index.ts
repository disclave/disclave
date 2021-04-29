import { container } from "./inversify.config";
import { CommentService } from "@/modules/comments";
import { initDatabase } from "@/connectors/mongodb";
import { EmailTemplate, initMailjet } from "@/connectors/mailjet";
import { EmailService } from "@/modules/email";
import { ProfileService } from "@/modules/profiles";
import { initFirebase } from "@/connectors/firebase/Firebase";

export interface DbConfig {
  dbUri: string;
  dbName: string;
}

export interface MailjetConfig {
  apiKey: string;
  apiSecret: string;
  templates: {
    emailVerification: number;
  };
}

export const init = async (
  firebaseServiceAccountObject: Object,
  dbConfig: DbConfig,
  mjConfig: MailjetConfig
) => {
  const emailTemplates = new Map<EmailTemplate, number>();
  emailTemplates.set(
    EmailTemplate.EMAIL_VERIFICATION,
    Number(mjConfig.templates.emailVerification)
  );

  initMailjet(mjConfig.apiKey, mjConfig.apiSecret, emailTemplates);
  initFirebase(firebaseServiceAccountObject);
  await initDatabase(dbConfig.dbUri, dbConfig.dbName);
};

export { graphqlHandler } from "./graphql";

export { getUserCookie } from "./cookies";
export type { Session, UserId, asUserId } from "./modules/auth";
export type { Profile } from "./modules/profiles";

export const getProfileService = () => container.get(ProfileService);
export const getEmailService = () => container.get(EmailService);
export const getCommentService = () => container.get(CommentService);
