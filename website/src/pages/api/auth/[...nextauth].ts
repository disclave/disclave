import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { getEmailService } from '@disclave/server';
import { initServer } from '@/modules/server';

initServer().catch((e) => console.error(e));

export default NextAuth({
  providers: [
    Providers.Email({
      sendVerificationRequest: async ({ identifier: email, url, token, baseUrl, provider }) => {
        const emailService = getEmailService();
        await emailService.sendAuthVerificationCodeEmail(email, token);
      }
    })
  ],
  database: process.env.DB_URI
});
