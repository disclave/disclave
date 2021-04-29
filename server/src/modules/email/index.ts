export abstract class EmailService {
  abstract sendEmailVerification(email: string, code: string): Promise<void>;
}
