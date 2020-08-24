const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const { applyMiddleware } = require("graphql-middleware");
const { permissions } = require('./permissions')

const { Prisma } = require('prisma-binding');
const path = require('path');
const { typeDefs } = require('./schema')

const port = 4001


const db = new Prisma({
  typeDefs: path.resolve(__dirname, '../generated/prisma-schema.graphql'),
  endpoint: process.env.PRISMA_URL,
  secret: "mysecret"
})

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')



const server = new ApolloServer({
  context: ({req}) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { ...req, db, user }
  },
  schema: applyMiddleware(buildFederatedSchema([
    {
      typeDefs,
      resolvers: {
        User,
        Mutation,
        Query
      },
    }
  ]),permissions)
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Acounts ready at ${url}`);
});