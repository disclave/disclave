import handler from '../../server/graphql/Server';

export const config = {
  api: {
    bodyParser: false
  }
};

export default handler('/api/graphql');
