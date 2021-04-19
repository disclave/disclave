import {
  EmailTemplate,
  getTemplateId,
  mailjetClient,
  MjClient,
} from "../mailjet";
import { EmailService } from "./index";
import { injectable } from "inversify";

@injectable()
export class MailjetEmailService implements EmailService {
  private client: MjClient;

  constructor() {
    this.client = mailjetClient();
  }

  public async sendVerificationEmail(email: string, link: string) {
    const templateId = getTemplateId(EmailTemplate.EMAIL_VERIFICATION);
    const variables = {
      confirmation_link: link,
    };
    await this.sendMailFromTemplate(templateId, variables, email);
  }

  private async sendMailFromTemplate(
    templateId: string,
    variables: object,
    toEmail: string
  ) {
    await this.client.post("send", { version: "v3.1" }).request({
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
  }
}
