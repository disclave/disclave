import { graphqlHandler } from '@disclave/server';
import { initServer } from '@/modules/server';

initServer().catch((e) => console.error(e));

export const config = {
  api: {
    bodyParser: false
  }
};

export default graphqlHandler('/api/graphql');
