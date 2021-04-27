import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { getEmailService, getUserService } from '@disclave/server';
import { initServer } from '@/modules/server';

initServer().catch((e) => console.error(e));

const domain = process.env.DOMAIN;
const useSecureCookies = domain.startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-' : '';

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
      return session;
    }
  },
  database: process.env.DB_URI,
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}disclave.ST`,
      options: {
        httpOnly: true,
        sameSite: useSecureCookies ? 'none' : 'lax',
        path: '/',
        secure: useSecureCookies
      }
    },
    callbackUrl: {
      name: `${cookiePrefix}disclave.CB`,
      options: {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies
      }
    },
    csrfToken: {
      name: `${useSecureCookies ? '__Host-' : ''}disclave.CT`,
      options: {
        httpOnly: true,
        sameSite: useSecureCookies ? 'none' : 'lax',
        path: '/',
        secure: useSecureCookies
      }
    },
    pkceCodeVerifier: {
      name: `${cookiePrefix}disclave.PCV`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies
      }
    }
  }
});
