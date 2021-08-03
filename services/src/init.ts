import { initDatabase } from "@/connectors/mongodb";
import { EmailTemplate, initMailjet } from "@/connectors/mailjet";
import { initFirebase } from "@/connectors/firebase/Firebase";
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

export interface ServicesConfig {
  firebaseServiceAccountObject: Object;
  dbConfig: DbConfig;
  mjConfig: MailjetConfig;
  awsConfig: AwsConfig;
}

let _initExecuted = false;
export async function init(config: ServicesConfig) {
  if (_initExecuted) return;
  _initExecuted = true;

  console.info("Initializing services");

  const emailTemplates = new Map<EmailTemplate, number>();
  emailTemplates.set(
    EmailTemplate.EMAIL_VERIFICATION,
    Number(config.mjConfig.templates.emailVerification)
  );

  const buckets = new Map<Bucket, string>();
  buckets.set(Bucket.PAGES_BUCKET, config.awsConfig.buckets.pages);

  console.info("Initializing AWS");
  initAWS(
    config.awsConfig.accessKeyId,
    config.awsConfig.secretAccessKey,
    buckets
  );

  console.info("Initializing Mailjet");
  initMailjet(
    config.mjConfig.apiKey,
    config.mjConfig.apiSecret,
    emailTemplates
  );

  console.info("Initializing Firebase");
  initFirebase(config.firebaseServiceAccountObject);

  console.info("Initializing Database");
  await initDatabase(config.dbConfig.dbUri, config.dbConfig.dbName);
}
