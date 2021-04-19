export abstract class EmailService {
  abstract sendVerificationEmail(email: string, link: string): Promise<void>;
}
