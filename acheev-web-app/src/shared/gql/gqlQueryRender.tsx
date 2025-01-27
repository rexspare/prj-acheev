
// @ts-ignore
import React from 'react';
import * as Apollo from '@apollo/client';
import { GqlNetworkingError } from './gqlNetworkingError';
import { Spinner } from 'react-bootstrap';

interface IProps {
  errorMessage?: string;
}

interface IRenderProps<T> extends IProps {
  query: Apollo.QueryResult<T>;
  children: (data: NonNullable<T>) => JSX.Element;
}

export function GqlQueryRender<T>({ errorMessage, children, query }: IRenderProps<T>) {
  const { error, data, loading } = query;
  if (error) {
    console.error('Received error', error);
  }
  return loading ? <Spinner animation='grow' />
    : error ? <GqlNetworkingError error={error} message={errorMessage} />
      : data ? children(data as NonNullable<T>)
        : null;
}