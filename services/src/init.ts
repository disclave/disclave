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
  awsConfig: AwsConfig
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

  console.info("Cheking migrations");
  await runAllMigrations();
}
