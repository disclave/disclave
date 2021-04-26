export abstract class EmailService {
  abstract sendAuthVerificationCodeEmail(
    email: string,
    code: string
  ): Promise<void>;
}
