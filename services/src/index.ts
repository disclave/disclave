import { container } from "./inversify.config";
import { initDatabase } from "@/connectors/mongodb";
import { EmailTemplate, initMailjet } from "@/connectors/mailjet";
import { initFirebase } from "@/connectors/firebase/Firebase";
import { Bucket, initAWS } from "./connectors/aws";
import { runAllMigrations } from "./migrations";

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

export type { Profile } from "@/modules/profiles";

export type {
  UserId,
  IdToken,
  Email,
  UserCookieContent,
  DecodedIdToken,
} from "@/modules/auth";
export { asUserId, asIdToken, asEmail } from "@/modules/auth";
import { AuthProvider } from "@/modules/auth";
export type { AuthProvider };
export const getAuthProvider = () => container.get(AuthProvider);

import { EmailService } from "@/modules/email";
export type { EmailService };
export const getEmailService = () => container.get(EmailService);

import { ProfileService } from "@/modules/profiles";
export type { ProfileService };
export const getProfileService = () => container.get(ProfileService);

export type { PageComment } from "@/modules/comments/page";
export type { RankingComment } from "@/modules/comments/ranking";
import {
  PageCommentService,
  CommentRankingService,
  CommentVoteService,
} from "@/modules/comments";
export type { PageCommentService };
export const getPageCommentService = () => container.get(PageCommentService);
export type { CommentRankingService };
export const getCommentRankingService = () =>
  container.get(CommentRankingService);
export const getCommentVoteService = () => container.get(CommentVoteService);

export type { PageDetails } from "@/modules/pages/details";
export type { RankingPage } from "@/modules/pages/ranking";
import {
  PageDetailsService,
  PageRankingService,
  PageVoteService,
} from "@/modules/pages";
export type { PageDetailsService };
export const getPageDetailsService = () => container.get(PageDetailsService);
export type { PageRankingService };
export const getPageRankingService = () => container.get(PageRankingService);
export type { PageVoteService };
export const getPageVoteService = () => container.get(PageVoteService);
