import * as React from 'react';
import { ApolloError } from 'apollo-client';
import { formatGqlError } from '../Utilities';
import { Text } from 'react-native';

interface IProps {
  error: ApolloError | undefined;
  message?: string;
}

export const GqlNetworkingError: React.FC<IProps> = ({ error, message }: IProps) => {
  return (
    <Text allowFontScaling={false}>{message || formatGqlError(error)}</Text>
  );
}