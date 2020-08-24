'use strict';
const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const { app } = require('./app')

const path = '/graphql';


const gateway = new ApolloGateway({
  serviceList: [
    { name: 'accounts', url: 'http://accounts:4001/' },
    // { name: 'reviews', url: 'http://reviews:4002/' },
    // { name: 'products', url: 'http://products:4003/' },
    // { name: 'inventory', url: 'http://inventory:4004/' },
  ],
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http.headers.set(
          "user",
          context.user ? JSON.stringify(context.user) : null
        );
      }
    });
  },
  __exposeQueryPlanExperimental: false,
});

(async () => {
  const server = new ApolloServer({
    gateway,
    engine: false,
    subscriptions: false,
    context: ({ req }) => {
      const user = req.user || null;
      return { user };
    }
  });

  server.applyMiddleware({ app, path });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 API Getaway ready`)
  )
})();
