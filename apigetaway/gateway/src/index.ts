
import { ApolloServer } from 'apollo-server-express'
import { GraphQLRequest } from "apollo-server-core";
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway'
import { ReqWithUser } from './middlewares/req-user'
import { app } from './app'




interface ContextWithUser {  
  user?: string | null 
}



const path = '/';


const gateway = new ApolloGateway({
  serviceList: [
    { name: 'accounts', url: 'http://accounts:4001/' },
  ],
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context } : { request: GraphQLRequest, context: ContextWithUser }) {
        request.http!.headers.set(
          "user",
          context.user ? JSON.stringify(context.user) : '{}'
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
