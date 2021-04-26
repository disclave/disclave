import {
  EmailTemplate,
  getTemplateId,
  mailjetClient,
} from "@/connectors/mailjet";
import { EmailService } from "./index";
import { injectable } from "inversify";

@injectable()
export class MailjetEmailService implements EmailService {
  public async sendAuthVerificationCodeEmail(email: string, code: string) {
    const templateId = getTemplateId(EmailTemplate.AUTH_VERIFICATION_CODE);
    const variables = {
      verification_code: code,
    };
    await sendMailFromTemplate(templateId, variables, email);
  }
}

const sendMailFromTemplate = async (
  templateId: number,
  variables: object,
  toEmail: string
) => {
  await mailjetClient()
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          TemplateLanguage: true,
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
