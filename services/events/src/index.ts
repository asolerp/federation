import { ApolloServer } from "apollo-server"
import { buildFederatedSchema } from "@apollo/federation"

import {resolvers} from './resolvers/index'
import { natsWrapper } from './nats-wrapper'

import { db } from './db'
import { typeDefs } from './schema'

const port = 4002



const server = new ApolloServer({
  context: ({req}) => {
    const user = req.headers.user ? JSON.parse(req.headers.user.toString()) : null;
    return { ...req, db, user }
  },
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers: resolvers
    }
  ])
})

const start = async () => {
  if (!process.env.NATS_CLIEND_ID) {
    throw new Error('NATS_CLIEND_ID must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID, 
      process.env.NATS_CLIEND_ID, 
      process.env.NATS_URL
    );

    await natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
  
  } catch (err) {
    console.log(err)
  }

  server.listen({ port }).then(({ url }) => {
    console.log(`🚀 Acounts server ready at ${url}`);
  });

}

start()

