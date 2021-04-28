import { graphqlHandler } from '@disclave/server';
import { initServer } from '@/modules/server';
import { getSession } from 'next-auth/client';
import { IncomingMessage } from 'http';
import cookie from 'cookie';
import { cookiesConfig } from '@/pages/api/auth/[...nextauth]';

initServer().catch((e) => console.error(e));

export const config = {
  api: {
    bodyParser: false
  }
};

const sessionParser = async (req: IncomingMessage) => {
  // console.log('headers', req.headers);
  // const authHeader = req.headers.authorization;
  // // TODO: validate origin before assigning header to the cookie - it should be allowed only for iframed Disclave and Disclave Chrome Extension
  // console.log('authHeader', authHeader);
  // if (authHeader) {
  //   const cookieHeader = req.headers.cookie || '';
  //   console.log('cookieHeader', cookieHeader);
  //   const cookies = cookie.parse(cookieHeader);
  //   const sessionCookie = cookies[cookiesConfig.sessionToken.name];
  //   console.log('sessionCookie', sessionCookie);
  //   if (!sessionCookie) {
  //     req.headers.cookie = `${cookieHeader}; ${cookiesConfig.sessionToken.name}=${authHeader}`;
  //     console.log('updated cookieHeader', req.headers.cookie);
  //   }
  // }

  return await getSession({ req });
};

export default graphqlHandler('/api/graphql', sessionParser);
