import Cors from 'micro-cors'
import {ApolloServer, gql} from 'apollo-server-micro'
import {commentsTypeDefs} from '../comments/Schemas'
import {commentsResolvers} from '../comments/Resolvers'
import {usersTypeDefs} from "../users/Schemas";
import {usersResolvers} from "../users/Resolvers";

const cors = Cors();

const baseTypes = gql`
  type Query {
    _: String
  }
  
  type Mutation {
    _: String
  }
`

const apolloServer = new ApolloServer({
  typeDefs: [
    baseTypes,
    commentsTypeDefs,
    usersTypeDefs
  ],
  resolvers: [
    commentsResolvers,
    usersResolvers
  ]
})

export default (path: string) => {
  const handler = apolloServer.createHandler({path});

  return cors((req, res) =>
    req.method === 'OPTIONS'
      ? res.end()
      : handler(req, res)
  )
}