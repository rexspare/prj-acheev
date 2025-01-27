import { createContext } from 'react';
import { CurrentUserFieldsFragment } from '../../types/gqlReactTypings.generated.d';

export interface IAuthContext {
  signIn: (token: string, user: CurrentUserFieldsFragment) => void;
  setCurrentUser: (currentUser: CurrentUserFieldsFragment) => void;
  signOut: () => void;
  currentUser: CurrentUserFieldsFragment | undefined;
  refreshCurrentUser: () => void;
}

export interface IAuthState {
  token?: string | null;
  currentUser?: CurrentUserFieldsFragment;
  currentDate?: Date;
  isLoading?: boolean;
}

export enum AuthActionTypes {
  SIGN_IN = 'SIGN_IN',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  SET_CURRENT_DATE = 'SET_CURRRENT_DATE',
  SIGN_OUT = 'SIGN_OUT',
}

type AuthAction =
  | { type: AuthActionTypes.SIGN_IN; payload: IAuthState }
  | { type: AuthActionTypes.SET_CURRENT_USER; payload: IAuthState }
  | { type: AuthActionTypes.SET_CURRENT_DATE; payload: IAuthState }
  | { type: AuthActionTypes.SIGN_OUT };

type AuthReducer = (prevState: IAuthState, action: AuthAction) => IAuthState;

const defaultAuthContext: IAuthContext = {
  signIn: (token) => {
    console.log('token set by sign in', token);
  },
  setCurrentUser: (currentUser) => {
    console.log('current user set', currentUser);
  },
  refreshCurrentUser: () => {
    console.log("refresh current user not set");
  },
  signOut: () => {
    console.log('context not set');
  },
  currentUser: undefined,
};

export const authReducer: AuthReducer = (prevState, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN:
      return {
        ...prevState,
        token: action.payload.token,
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    case AuthActionTypes.SET_CURRENT_USER:
      return {
        ...prevState,
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    case AuthActionTypes.SET_CURRENT_DATE:
      return {
        ...prevState,
        currentDate: action.payload.currentDate,
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
  currentDate: new Date(),
  isLoading: true,
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);
