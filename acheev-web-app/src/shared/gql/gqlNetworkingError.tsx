import * as React from 'react';
import { ApolloError } from '@apollo/client';
import { formatGqlError } from 'shared/Utilities';

interface IProps {
  error: ApolloError | undefined;
  message?: string;
}

export const GqlNetworkingError: React.FC<IProps> = ({ error, message }: IProps) => {
  return (
    <h5>{message || formatGqlError(error)}</h5>
  );
}