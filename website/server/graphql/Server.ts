import Cors from 'micro-cors'
import {ApolloServer} from 'apollo-server-micro'
import {typeDefs} from '../messages/Schemas'
import {resolvers} from '../messages/Resolvers'

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

export default (path: string) => {
  const handler = apolloServer.createHandler({path});

  return cors((req, res) =>
    req.method === 'OPTIONS'
      ? res.end()
      : handler(req, res)
  )
}