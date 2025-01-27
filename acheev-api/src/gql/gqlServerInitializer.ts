import { ApolloContext } from "../types/types";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { compact, defaultsDeep, isEmpty, last } from 'lodash';
import { UserModel } from "../models/userModel";
import { applyMiddleware } from 'graphql-middleware';
import { Resolvers } from "../types/gqlTypings.generated";
import { GQL_RESOLVERS, GQL_SCALAR_RESOLVERS } from "./gqlResolvers";
import gqlPermissions from "./gqlPermissions";
import { getGraphqlSchema } from "../shared/utilities";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import { WebSocketServer } from "ws";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

export const typeDefs = getGraphqlSchema();

let combinedResolvers: Resolvers = {};
compact(GQL_RESOLVERS.map(item => item.resolvers)).forEach(item => {
  combinedResolvers = defaultsDeep(combinedResolvers, item);
});

export const resolvers = [combinedResolvers, GQL_SCALAR_RESOLVERS] as any;

const executableSchema = makeExecutableSchema({
  typeDefs, resolvers
});

const schema = applyMiddleware(executableSchema, gqlPermissions);

export function createApolloServer(httpServer: http.Server ) {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/gql",
  });

  const serverCleanup = useServer({ 
    schema,
    context: async (ctx, msg, args) => {
      const token = last(((ctx.connectionParams?.Authorization || '') as string).split(' '));
      if (isEmpty(token)) console.warn(`Auth token not set`);

      let currentUser: UserModel | undefined;
      if (!isEmpty(token)) {
        currentUser = await UserModel.query().findOne({ token });
      }

      return {
        currentUser,
        isCurrentUserAdmin: currentUser?.admin || false,
        isCurrentUserSuperAdmin: (currentUser?.admin && !currentUser.restrictedAdmin) || false,
      };
    },
   }, 
   wsServer,
  );

  return new ApolloServer({
    schema,
    context: async ({ req }): Promise<ApolloContext> => {
      const token = last((req.headers.authorization || '').split(' '));
      if (isEmpty(token)) console.warn(`Auth token not set`);

      let currentUser: UserModel | undefined;
      if (!isEmpty(token)) {
        currentUser = await UserModel.query().findOne({ token });
      }


      return {
        currentUser,
        isCurrentUserAdmin: currentUser?.admin || false,
        isCurrentUserSuperAdmin: (currentUser?.admin && !currentUser.restrictedAdmin) || false,
      };
    },
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
}
