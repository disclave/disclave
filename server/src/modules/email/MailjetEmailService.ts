import {
  EmailTemplate,
  getTemplateId,
  mailjetClient,
} from "@/connectors/mailjet";
import { EmailService } from "./index";
import { injectable } from "inversify";

@injectable()
export class MailjetEmailService implements EmailService {
  public async sendVerificationEmail(email: string, link: string) {
    const templateId = getTemplateId(EmailTemplate.EMAIL_VERIFICATION);
    const variables = {
      confirmation_link: link,
    };
    await sendMailFromTemplate(templateId, variables, email);
  }
}

const sendMailFromTemplate = async (
  templateId: string,
  variables: object,
  toEmail: string
) => {
  await mailjetClient()
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          TemplateID: templateId,
          To: [
            {
              Email: toEmail,
            },
          ],
          Variables: variables,
        },
      ],
    });
};
