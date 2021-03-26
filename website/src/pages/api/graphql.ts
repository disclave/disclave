import { init, graphqlHandler } from '@disclave/server';

init(JSON.parse(process.env.FIREBASE_CERT));

export const config = {
  api: {
    bodyParser: false
  }
};

export default graphqlHandler('/api/graphql');
