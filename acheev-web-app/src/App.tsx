import React, { useEffect, useReducer, useState, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminRoutes, GeneralRoutes } from 'shared/Routes';
import { Login } from 'pages/onboarding/login';
import ObjectHash from 'object-hash';
// @ts-ignore
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles/css/global.css'
import { authReducer, AuthDefaultState, AuthActionTypes, IAuthContext, AuthContext, CurrentUserProvider } from 'shared/Authentication';
import { setLocalToken, clearLocalToken, getLocalToken, getCurrentUser, setCurrentUser } from 'shared/Utilities';
import { isEmpty } from 'lodash';
import { ApolloProvider, useApolloClient } from '@apollo/client';
import { gqlClient } from 'shared/gql/GqlClient';
import { AdminRouter } from 'pages/admin/AdminRouter';
import { Logout } from 'pages/onboarding/logout';
import './styles/scss/global.scss'


interface IProps {
  match?: any;
}

export const App: React.FC<IProps> = ({ match: _match }: IProps) => {
  const [authState, authDispatch] = useReducer(authReducer, AuthDefaultState);
  const [currentUserRefreshTimestamp, setCurrentUserRefreshTimestamp] = useState<number>();
  const apolloClient = useApolloClient();

  useEffect(() => {
    $("#sidebarToggle, #sidebarToggleTop").on('click', function (_e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
    });
  }, []);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        console.log("Checking user token");
        const token = getLocalToken();
        const currentUser = getCurrentUser();

        if (isEmpty(token) || isEmpty(currentUser)) {
          console.log("Token or user empty, triggering signout");
          authDispatch({ type: AuthActionTypes.SIGN_OUT });
        }

        console.log("Token/user", token, currentUser);
        authDispatch({ type: AuthActionTypes.SIGN_IN, payload: { token, currentUser } });
      } catch (e) {
        authDispatch({ type: AuthActionTypes.SIGN_OUT });
      }
    };
    checkUserToken().catch(console.log);
  }, []);

  const authContext = useMemo<IAuthContext>(
    () => ({
      signIn: async (token, currentUser) => {
        console.log("Setting access token", token);
        setLocalToken(token);
        setCurrentUser(currentUser);
        authDispatch({ type: AuthActionTypes.SIGN_IN, payload: { token, currentUser } });
      },
      signOut: async () => {
        console.log("Signing out, removing access token");
        await apolloClient.clearStore();
        clearLocalToken();
        authDispatch({ type: AuthActionTypes.SIGN_OUT });
      },
      currentUser: authState.currentUser,
      refreshCurrentUser: () => {
        console.log("Attempting to refresh current user");
        setCurrentUserRefreshTimestamp(new Date().getTime());
      }
    }), [authState.token, ObjectHash(authState.currentUser ?? {})],
  );

  if (authState.isLoading === true) {
    return <span />;
  }

  console.log(authState.token, authState.currentUser);


  return (
    <ApolloProvider client={gqlClient}>
      <AuthContext.Provider value={authContext}>
        <CurrentUserProvider
          token={authState.token}
          currentUserRefreshTimestamp={currentUserRefreshTimestamp}
        />
        {(!!authState.token && !!authState.currentUser) ? (
          <Routes>
            <Route path={GeneralRoutes.LOGOUT} element={<Logout />} />
            <Route path={AdminRoutes.ROUTER} element={<AdminRouter />} />
            <Route path='*' element={<Navigate replace to={AdminRoutes.HOME} />} />
          </Routes>
        )
          :
          <Routes>
            <Route path={GeneralRoutes.LOGIN} element={<Login />} />
            <Route path='*' element={<Navigate replace to={GeneralRoutes.LOGIN} />} />
          </Routes>
        }
      </AuthContext.Provider>
    </ApolloProvider >
  );
}
