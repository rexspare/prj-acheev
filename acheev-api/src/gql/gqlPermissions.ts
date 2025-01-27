import { IRules, allow, rule, shield } from 'graphql-shield'
import { Resolvers } from '../types/gqlTypings.generated';
import { ApolloContext } from '../types/types';
// import { isProdEnviroment } from '../shared/utilities';

const isAuthenticated = rule()(async (_parent, _args, ctx: ApolloContext, _info) => {
  return ctx.currentUser !== undefined
});

// const isAdmin = rule()(async (parent, args, { isCurrentUserAdmin }: ApolloContext, _info) => {
//   return isCurrentUserAdmin === true;
// });

const rules: Resolvers = {
  Query: {
    me: isAuthenticated as any,
  },
  Mutation: {
    register: allow as any,
    login: allow as any,
  },
};

// Hack coersion
export default shield(
  rules as IRules,
  {
    fallbackRule: allow,
    debug: true
  },
);