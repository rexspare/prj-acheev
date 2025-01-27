import React, { useMemo, useReducer, useEffect, useState } from 'react';
import { LoggedOutNavigator, LoggedInNavigator } from "./src/BaseNavigator";
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createApolloClient } from './src/shared/gql/apolloClient';
import { AuthDefaultState, authReducer, AuthActionTypes, IAuthContext, AuthContext } from './src/shared/auth/Authentication';
import { PermissionsAndroid, Platform, StatusBar, View } from 'react-native';
import { getAccessToken, setAccessToken, removeAccessToken, getCurrentUser } from './src/shared/storage';
import { BaseRoutes } from './src/shared/Routing';
import { CurrentUserProvider } from './src/shared/auth/CurrentUserProvider';
import ObjectHash from 'object-hash';
import { PushNotificationRequester } from './src/shared/components/PushNotificationRequester';
import { navigationRef } from './src/RootNavigation';
import useCachedResources from './src/hooks/useCachedResources';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [authState, authDispatch] = useReducer(authReducer, AuthDefaultState);
  const [currentUserRefreshTimestamp, setCurrentUserRefreshTimestamp] = useState<number>();
  const isLoadingComplete = useCachedResources();
  const [hasSubscribed, sethasSubscribed] = useState(false)

  console.log = () => { }
  console.error = () => { }

  useEffect(() => {
    Audio.setAudioModeAsync({
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
      allowsRecordingIOS: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
    });
  }, []);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        console.log("Checking user token");
        const token = await getAccessToken();
        const currentUser = await getCurrentUser();
        // AsyncStorage.getItem("@Subscribed")
        //   .then((data) => {
        //     if (data) {
        //       sethasSubscribed(true)
        //     }
        //   })
        //   .catch(() => { })

        console.log("Token/user", token, currentUser);
        authDispatch({ type: AuthActionTypes.SIGN_IN, payload: { token } });
      } catch (e) {
        authDispatch({ type: AuthActionTypes.SIGN_OUT });
      }
    };
    checkUserToken().catch(console.log);
  }, []);

  const authContext = useMemo<IAuthContext>(
    () => {
      return ({
        signIn: async (token, user) => {
          console.log("Setting access token via app.tsx signin", token, user);

          await setAccessToken(token);
          authDispatch({ type: AuthActionTypes.SIGN_IN, payload: { token, currentUser: user } });
        },
        setCurrentUser: async (currentUser) => {
          console.log("Setting current user direct");
          authDispatch({ type: AuthActionTypes.SET_CURRENT_USER, payload: { currentUser } });
        },
        signOut: async () => {
          console.log("Signing out, removing access token");
          await removeAccessToken();
          await client?.clearStore();
          authDispatch({ type: AuthActionTypes.SIGN_OUT });
          authDispatch({ type: AuthActionTypes.SET_CURRENT_USER, payload: { currentUser: undefined } });

        },
        currentUser: authState.currentUser,
        refreshCurrentUser: () => {
          console.log("Attempting to refresh current user");
          setCurrentUserRefreshTimestamp(new Date().getTime());
        }
      })
    }, [authState.token, authState.currentUser?.id, ObjectHash(authState.currentUser ?? {}), authState.currentUser?.fullName, authState.currentDate?.toISOString()],
  );

  const client = useMemo(() =>
    createApolloClient(authState.token ?? undefined)
    , [ObjectHash(authContext)]
  );

  useEffect(() => {
    if (authState.token) {
      console.log(`Should refresh user for token: ${authState.token}`);
    }
  }, [authState.token]);


  if (!isLoadingComplete) {
    return null;
  } else if (authState.isLoading) {
    return <View />;
  }


  // console.log("current user in app.tsx", authState.currentUser);
  const currentUser = authState?.currentUser;

  return (
    <AuthContext.Provider value={authContext}>
      <ApolloProvider client={client}>
        <StatusBar barStyle="light-content" />
        <CurrentUserProvider
          token={authState.token ?? undefined}
          currentUserRefreshTimestamp={currentUserRefreshTimestamp}
        />
        <PushNotificationRequester />
        <NavigationContainer ref={navigationRef}>
          {(!!authState.token && currentUser != null) ?
            <LoggedInNavigator initialRouteName={BaseRoutes.HOME} />
            :
            <LoggedOutNavigator initialRouteName={BaseRoutes.ONBOARDING} />
          }
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}


