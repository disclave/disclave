import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { getEmailService, getUserService } from '@disclave/server';
import { initServer } from '@/modules/server';

initServer().catch((e) => console.error(e));

export default NextAuth({
  providers: [
    Providers.Email({
      async sendVerificationRequest({ identifier: email, token }) {
        const emailService = getEmailService();
        await emailService.sendAuthVerificationCodeEmail(email, token);
      },
      async generateVerificationToken() {
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
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    async session(session, token) {
      if (token) {
        const userService = getUserService();
        const uid = String(token?.id);
        session.uid = uid;
        session.profile = await userService.getProfile(uid);
      }
      console.log(session);
      return session;
    }
  },
  database: process.env.DB_URI
});
