import { init, graphqlHandler } from '@webchat/server';

init(JSON.parse(process.env.FIREBASE_CERT));

export const config = {
  api: {
    bodyParser: false
  }
};

export default graphqlHandler('/api/graphql');
