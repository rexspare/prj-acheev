import { ApolloClient, from, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { getAccessToken } from '../storage';
import { isIos, isSimulator } from '../Utilities';

const authLink = (token: string | undefined) => setContext(async (_, { headers }) => {
  const accessToken = token ? token : await getAccessToken();
  // console.log("Request token: ", accessToken);
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    }
  };
});

const uri = isSimulator() ? (
  isIos() ?
    `http://localhost:4060/gql`
    : `http://10.0.2.2:4060/gql`
)
  : "http://10.0.2.2:4060/gql";


export const createApolloClient = (token: string | undefined) => {
  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://10.0.2.2:4060/gql',
    connectionParams: {
      Authorization: `Bearer ${token}` ,
    },
  }));

  const httpLink = new HttpLink({
    uri
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    link: from([authLink(token), splitLink]),
    cache: new InMemoryCache()
  });
}
