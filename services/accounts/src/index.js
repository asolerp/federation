const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const { Prisma } = require('prisma-binding');
const path = require('path');
const { typeDefs } = require('./schema')

const port = 4001


const db = new Prisma({
  typeDefs: path.resolve(__dirname, '../generated/prisma-schema.graphql'),
  endpoint: process.env.PRISMA_URL
})

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')



const server = new ApolloServer({
  context: ({req}) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { ...req, db, user }
  },
  // context: (req) => {
  //   const user = req.headers.user ? JSON.parse(req.headers.user) : null;
  //   return { ...req, db, user}
  // },
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
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Acounts ready at ${url}`);
});