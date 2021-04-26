import { graphqlHandler } from '@disclave/server';
import { initServer } from '@/modules/server';
import { getSession } from 'next-auth/client';

initServer().catch((e) => console.error(e));

export const config = {
  api: {
    bodyParser: false
  }
};

export default graphqlHandler('/api/graphql', (req: any) => getSession({ req }));
