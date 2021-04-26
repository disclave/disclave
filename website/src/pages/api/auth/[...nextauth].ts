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
      },
      generateVerificationToken: async (): Promise<string> => {
        const length = 6;
        const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789'; // A-Z1-9 (O and 0 removed)
        const charactersLength = characters.length;
        const result = [];
        for (let i = 0; i < length; i++)
          result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        return result.join('');
      }
    } as any) // TODO: remove cast to any when next-auth types fixed
  ],
  database: process.env.DB_URI
});
