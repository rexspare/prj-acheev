
import { ApolloClient, from, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getLocalToken } from 'shared/Utilities';

const apiUrl = process.env.REACT_APP_GQL_API_URL;

const isLocal = window.location.hostname.includes('localhost');

const httpLink = new HttpLink({ uri: apiUrl });


const authLink = setContext((_, { headers }) => {

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${getLocalToken()}`,
    },
  };
});

export const gqlClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
