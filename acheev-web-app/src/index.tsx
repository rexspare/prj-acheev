// @ts-ignore
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { gqlClient } from 'shared/gql/GqlClient';
import { ApolloProvider } from '@apollo/client';


const render = (Component: any) => {
  console.error('client', gqlClient);
  // eslint-disable-next-line react/no-render-return-value
  return ReactDOM.render(
    <ApolloProvider client={gqlClient}>
      <BrowserRouter>

        <Component />
      </BrowserRouter>

    </ApolloProvider>,
    document.getElementById('root') as HTMLElement
  );
};

render(App);

// @ts-ignore
if (module.hot) {
  console.log('hot!');
  // @ts-ignore
  module.hot.accept();
  // @ts-ignore
  // module.hot.accept('./App', () => {
  //   console.log('hotter!');
  //   const NextApp = require('./App').default;
  //   render(NextApp);
  // })
}

// Unregister the CRA service worker - we're going to rely on normal browser caching for now.
