import {ApolloServer} from 'apollo-server-micro'
import {typeDefs} from '../messages/Schemas'
import {resolvers} from '../messages/Resolvers'

const apolloServer = new ApolloServer({typeDefs, resolvers})

export default (path: string) => {
  return apolloServer.createHandler({path});
}