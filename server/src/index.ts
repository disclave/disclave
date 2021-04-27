import { container } from "./inversify.config";
import { CommentService } from "@/modules/comments";
import { initDatabase } from "@/connectors/mongodb";
import { EmailTemplate, initMailjet } from "@/connectors/mailjet";
import { EmailService } from "@/modules/email";
import { UserService } from "@/modules/users";

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

export const init = async (dbConfig: DbConfig, mjConfig: MailjetConfig) => {
  const emailTemplates = new Map<EmailTemplate, number>();
  emailTemplates.set(
    EmailTemplate.AUTH_VERIFICATION_CODE,
    Number(mjConfig.templates.authVerificationCode)
  );

  initMailjet(mjConfig.apiKey, mjConfig.apiSecret, emailTemplates);
  await initDatabase(dbConfig.dbUri, dbConfig.dbName);
};

export { graphqlHandler } from "./graphql";

export type { Session, UserId, asUserId } from "./modules/auth";
export type { UserProfile } from "./modules/users";

export const getUserService = () => container.get(UserService);
export const getEmailService = () => container.get(EmailService);
export const getCommentService = () => container.get(CommentService);
