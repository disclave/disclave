import { container } from "./inversify.config";
import { PageCommentService, CommentRankingService } from "@/modules/comments";
import { initDatabase } from "@/connectors/mongodb";
import { EmailTemplate, initMailjet } from "@/connectors/mailjet";
import { EmailService } from "@/modules/email";
import { ProfileService } from "@/modules/profiles";
import { initFirebase } from "@/connectors/firebase/Firebase";
import { PageService } from "./modules/pages";
import { Bucket, initAWS } from "./connectors/aws";
import { runAllMigrations } from "./migrations";
import { PageRankingService } from "./modules/page-ranking";

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

let _initExecuted = false;
export async function init(
  firebaseServiceAccountObject: Object,
  dbConfig: DbConfig,
  mjConfig: MailjetConfig,
  awsConfig: AwsConfig,
  skipMigrations: boolean
) {
  if (_initExecuted) return;
  _initExecuted = true;

  console.info("Initializing server");

  const emailTemplates = new Map<EmailTemplate, number>();
  emailTemplates.set(
    EmailTemplate.EMAIL_VERIFICATION,
    Number(mjConfig.templates.emailVerification)
  );

  const buckets = new Map<Bucket, string>();
  buckets.set(Bucket.PAGES_BUCKET, awsConfig.buckets.pages);

  console.info("Initializing AWS");
  initAWS(awsConfig.accessKeyId, awsConfig.secretAccessKey, buckets);

  console.info("Initializing Mailjet");
  initMailjet(mjConfig.apiKey, mjConfig.apiSecret, emailTemplates);

  console.info("Initializing Firebase");
  initFirebase(firebaseServiceAccountObject);

  console.info("Initializing Database");
  await initDatabase(dbConfig.dbUri, dbConfig.dbName);

  if (!skipMigrations) {
    console.info("Cheking migrations");
    await runAllMigrations();
  } else {
    console.info("Migrations skipped");
  }
}

export { graphqlHandler } from "./graphql";

export { getUserCookie } from "./cookies";
export type { UserCookieContent } from "./modules/auth";

export const getProfileService = () => container.get(ProfileService);
export const getEmailService = () => container.get(EmailService);

export const getPageCommentService = () => container.get(PageCommentService);
export const getCommentRankingService = () =>
  container.get(CommentRankingService);

export const getPageService = () => container.get(PageService);
export const getPageRankingService = () => container.get(PageRankingService);
