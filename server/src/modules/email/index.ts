export abstract class EmailService {
  abstract sendEmailVerification(email: string, link: string): Promise<void>;
}
