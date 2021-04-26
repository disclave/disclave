import Mailjet from "node-mailjet";

type MjClient = Mailjet.Email.Client;

export enum EmailTemplate {
  AUTH_VERIFICATION_CODE,
}

export type EmailTemplateIds = Map<EmailTemplate, number>;

let client: MjClient | undefined = undefined;
let templates: EmailTemplateIds | undefined = undefined;

export const initMailjet = (
  apiKey: string,
  apiSecret: string,
  emailTemplates: EmailTemplateIds
) => {
  client = Mailjet.connect(apiKey, apiSecret);
  templates = emailTemplates;
};

export const mailjetClient = (): MjClient => {
  if (!client) throw "Mailjet client not initialized";
  return client;
};

export const getTemplateId = (template: EmailTemplate): number => {
  if (!templates) throw "Mailjet client not initialized";
  const id = templates.get(template);
  if (!id) throw `Template Id for email template ${template} does not exist`;
  return id;
};

export type { MjClient };
