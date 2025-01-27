import { createContext } from 'react';
import { CurrentUserFieldsFragment, useMeLazyQuery } from '../types/gqlReactTypings.generated.d';
import React, { useEffect, useContext } from 'react';
import ObjectHash from 'object-hash';
import { setCurrentUser, setLocalToken } from './Utilities';

export interface IAuthContext {
  signIn: (token: string, user: CurrentUserFieldsFragment) => void;
  refreshCurrentUser: () => void;
  signOut: () => void;
  currentUser: CurrentUserFieldsFragment | undefined;
}

export interface IAuthState {
  token?: string;
  currentUser?: CurrentUserFieldsFragment;
  isLoading?: boolean;
}

export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

type AuthAction =
  | { type: AuthActionTypes.SIGN_IN; payload: IAuthState }
  | { type: AuthActionTypes.SIGN_OUT };

type AuthReducer = (prevState: IAuthState, action: AuthAction) => IAuthState;

const defaultAuthContext: IAuthContext = {
  signIn: (token) => {
    console.log('token set', token);
  },
  refreshCurrentUser: () => {
    console.log("refresh current user not set");
  },
  signOut: () => {
    console.log('context not set');
  },
  currentUser: undefined
};

export const authReducer: AuthReducer = (prevState, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN:
      const { currentUser, token } = action.payload;
      if (currentUser) {
        setCurrentUser(currentUser);
      }
      if (token) {
        setLocalToken(token);
      }
      return {
        ...prevState,
        token,
        currentUser,
        isLoading: false,
      };
    case AuthActionTypes.SIGN_OUT:
      return {
        ...prevState,
        token: undefined,
        currentUser: undefined,
        isLoading: false,
      };
  }
};

export const AuthDefaultState: IAuthState = {
  token: undefined,
  currentUser: undefined,
  isLoading: true,
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

interface IProps {
  token: string | undefined;
  currentUserRefreshTimestamp?: number;
}

export const CurrentUserProvider: React.FC<IProps> = ({ token, currentUserRefreshTimestamp }: IProps) => {
  const { signOut, signIn } = useContext(AuthContext);
  const [meQuery, { data, refetch },] = useMeLazyQuery();

  useEffect(() => {
    console.log("Triggering refresh: ", currentUserRefreshTimestamp)
    if ((currentUserRefreshTimestamp ?? 0) > 0) {
      refetch?.();
    }
  }, [currentUserRefreshTimestamp]);

  useEffect(() => {
    if (!!token) {
      console.log("Token detected. Fetching current user");
      meQuery();
    }
  }, [token]);

  useEffect(() => {
    if (!!data) {
      const { me } = data;

      if (!!me?.user && !!me.token) {
        console.log(`Setting current user: ${JSON.stringify(me)}`);
        signIn(me.token, me.user);
      } else {
        signOut();
      }
    }
  }, [ObjectHash(data?.me ?? {})])

  return null;
}