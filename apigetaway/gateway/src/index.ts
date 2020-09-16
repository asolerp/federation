
import { ApolloServer } from 'apollo-server-express'
import { GraphQLRequest } from "apollo-server-core";
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway'
import { ReqWithUser } from './middlewares/req-user'
import { app } from './app'

const FileUploadDataSource = require('./utils/FileUploadDataSource.js');


interface ContextWithUser {  
  user?: string | null 
}


const path = '/';

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'accounts', url: 'http://accounts:4001/' },
    { name: 'events', url: 'http://matches:4002/' },
    { name: 'phone-verification', url: 'http://phone-verification:4003/' },
  ],
  buildService: ({ url }) => new FileUploadDataSource({ url }),
});

(async () => {
  const server = new ApolloServer({
    gateway,
    engine: false,
    subscriptions: false,
    context: ({ req }: ReqWithUser ) => {
      const user = req.user || null;
      return { user };
    }
  });

  server.applyMiddleware({ app, path });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 API Getaway ready`)
  )
})();
