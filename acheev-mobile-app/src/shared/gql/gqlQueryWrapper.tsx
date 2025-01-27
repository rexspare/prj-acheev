
import { QueryResult } from '@apollo/client';
import * as React from 'react';
import { Text } from 'react-native';
import { GqlNetworkingError } from './gqlNetworkingError';

interface IProps {
  errorMessage?: string;
}

interface IRenderProps<T> extends IProps {
  query: QueryResult<T>;
  children: (data: NonNullable<T>) => JSX.Element;
}

export function GqlQueryRender<T>({ errorMessage, children, query }: IRenderProps<T>) {
  const { error, data, loading } = query;
  if (error) {
    console.error('Received error', error);
  }
  return loading ? <Text allowFontScaling={false}>Loading...</Text>
    : error ? <GqlNetworkingError error={error} message={errorMessage} />
      : data ? children(data as NonNullable<T>)
        : null;
}