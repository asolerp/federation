import { ApolloServer } from "apollo-server"
import { buildFederatedSchema } from "@apollo/federation"

import { Prisma } from 'prisma-binding'
import path from 'path'
import { typeDefs } from './schema'

const port = 4001


const db = new Prisma({
  typeDefs: path.resolve(__dirname, '../src/generated/prisma-schema.graphql'),
  endpoint: process.env.PRISMA_URL,
  secret: "mysecret"
})

import Query from  './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'



const server = new ApolloServer({
  context: ({req}) => {
    const user = req.headers.user ? JSON.parse(req.headers.user.toString()) : null;
    return { ...req, db, user }
  },
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers: {
        User,
        Mutation,
        Query
      },
    }
  ])
})


server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Acounts server ready at ${url}`);
});