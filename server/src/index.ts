import { container } from "./inversify.config";
import { CommentService } from "@/modules/comments";
import { initDatabase } from "@/connectors/mongodb";
import { EmailTemplate, initMailjet } from "@/connectors/mailjet";
import { EmailService } from "@/modules/email";
import { ProfileService } from "@/modules/profiles";
import { initFirebase } from "@/connectors/firebase/Firebase";
import { PageService } from "./modules/pages";
import { Bucket, initAWS } from "./connectors/aws";

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

export interface AwsConfig {
  accessKeyId: string;
  secretAccessKey: string;
  buckets: {
    pages: string;
  };
}

export const init = async (
  firebaseServiceAccountObject: Object,
  dbConfig: DbConfig,
  mjConfig: MailjetConfig,
  awsConfig: AwsConfig
) => {
  const emailTemplates = new Map<EmailTemplate, number>();
  emailTemplates.set(
    EmailTemplate.EMAIL_VERIFICATION,
    Number(mjConfig.templates.emailVerification)
  );

  const buckets = new Map<Bucket, string>();
  buckets.set(Bucket.PAGES_BUCKET, awsConfig.buckets.pages);

  initAWS(awsConfig.accessKeyId, awsConfig.secretAccessKey, buckets);
  initMailjet(mjConfig.apiKey, mjConfig.apiSecret, emailTemplates);
  initFirebase(firebaseServiceAccountObject);
  await initDatabase(dbConfig.dbUri, dbConfig.dbName);
};

export { graphqlHandler } from "./graphql";

export { getUserCookie } from "./cookies";
export type { UserCookieContent } from "./modules/auth";

export const getProfileService = () => container.get(ProfileService);
export const getEmailService = () => container.get(EmailService);
export const getCommentService = () => container.get(CommentService);
export const getPageService = () => container.get(PageService);
