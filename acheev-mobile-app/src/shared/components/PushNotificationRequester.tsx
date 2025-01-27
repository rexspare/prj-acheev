// import React, { useContext, useState, useEffect } from 'react';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';
// import { isEmpty } from 'lodash';
// import { AuthContext } from '../auth/Authentication';
// import { ModifyUserInput, useModifyUserMutation } from '../../types/gqlReactTypings.generated.d';
// import { isIos, isSimulator } from '../Utilities';

// export const PushNotificationRequesterOld: React.FC = () => {
//   const [iosPushToken, setIosPushToken] = useState<string>();
//   const [androidPushToken, setAndroidPushToken] = useState<string>();
//   const { currentUser } = useContext(AuthContext);
//   const [modifyUserMutation] = useModifyUserMutation();

//   useEffect(() => {
//     registerForPushNotificationsAsync().catch(console.error);

//     if (isSimulator()) {
//       setIosPushToken("wakerTestToken");
//     }

//     const notificationsSubscription = Notifications.addNotificationResponseReceivedListener(handleNotification);
//     return () => notificationsSubscription?.remove();
//   }, []);

//   useEffect(() => {
//     let userInput: ModifyUserInput = {};
//     if (isSimulator()) {
//       return;
//     }
//     if (!isEmpty(iosPushToken) && iosPushToken !== currentUser?.iosPushToken) {
//       userInput = { ...userInput, iosPushToken };
//     }

//     if (!isEmpty(androidPushToken) && androidPushToken !== currentUser?.androidPushToken) {
//       userInput = { ...userInput, androidPushToken };
//     }

//     if (Object.keys(userInput).length > 0 && currentUser != null) {
//       modifyUserMutation({ variables: { modifyUserInput: userInput } }).catch(err => {
//         window.alert(`Failed to update push notification token.  Error: ${err}`)
//       });
//     }
//   }, [iosPushToken, androidPushToken]);

//   const registerForPushNotificationsAsync = async () => {
//     try {
//       let token: string | undefined;
//       if (!!Constants.isDevice) {
//         const { status: existingStatus } = await Notifications.getPermissionsAsync();
//         let finalStatus = existingStatus;
//         if (existingStatus !== 'granted') {
//           const { status } = await Notifications.requestPermissionsAsync();
//           finalStatus = status;
//         }
//         if (finalStatus !== 'granted') {
//           // alert('Failed to get push token for push notification!');
//           console.info('Failed to get push token for push notification!');
//           return;
//         }
//         token = (await Notifications.getExpoPushTokenAsync({
//           projectId: "55108ebe-6f04-4bc3-b59c-588ed8788538"
//         })).data;
//         console.info("Received token ==>>", token);
//       } else {
//         return console.info('Must use physical device for Push Notifications');
//       }

//       if (!!isIos()) {
//         setIosPushToken(token);
//       } else {
//         setAndroidPushToken(token);

//         await Notifications.setNotificationChannelAsync('default', {
//           name: 'default',
//           importance: Notifications.AndroidImportance.MAX,
//           vibrationPattern: [0, 250, 250, 250],
//         });
//       }
//     } catch (e) {
//       console.error("Error in registerForPushNotificationsAsync", e);
//     }
//   };

//   const handleNotification = async (event: Notifications.NotificationResponse) => {
//     try {
//       const { request } = event.notification;
//       const notification = request.content;
//       console.info("in handleNotification", request);
//       onNotificationClick(notification)

//     } catch (e) {
//       console.error("Error handling notification in foreground", e);
//     }
//   };


//   const onNotificationClick = (notification: Notifications.NotificationContent) => {
//     try {
//       console.info("in onNotificationClick");
//       const data: {
//         switchOrg?: { [key: string]: string };
//         navigate?: { [key: string]: string };
//         analyticEvent?: { [key: string]: string };
//       } = (notification?.data as any) ?? {};


//       const { navigate } = data;

//       if (navigate != null) {
//         // const { root, screen, params = {} } = navigate;

//         // if (root) navigation?.navigate(root, { screen, params });
//         // else navigation?.navigate(screen, params);
//       }
//     } catch (e) {
//       console.error("Error clicking notification", e);
//     }
//   };

//   return (
//     <>

//     </>
//   );
// }


import React, { useContext, useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { isEmpty } from 'lodash';
import { AuthContext } from '../auth/Authentication';
import { ModifyUserInput, useModifyUserMutation } from '../../types/gqlReactTypings.generated.d';
import { isIos, isSimulator } from '../Utilities';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

export const PushNotificationRequester: React.FC = () => {
  const [iosPushToken, setIosPushToken] = useState<string>();
  const [androidPushToken, setAndroidPushToken] = useState<string>();
  const { currentUser } = useContext(AuthContext);
  const [modifyUserMutation] = useModifyUserMutation();

  // PUSH NOTIFICATION

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      getFcmToken();
    }
    requestPostNotificationPermission()
  };

  const requestPostNotificationPermission = async () => {
    if (Platform.OS === "android" && Platform.Version > 32) {
      try {
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
          response => {
            if (!response) {
              PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS', {
                title: 'Notification',
                message:
                  'Acheev App needs access to your notification ' +
                  'so you can get Updates',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              })
            }
          }
        ).catch(
          err => {
            console.log("Notification Error=====>", err);
          }
        )
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getFcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();

      let userInput: ModifyUserInput = {};
   

      if (Platform.OS == 'ios' && fcmToken && fcmToken !== currentUser?.iosPushToken) {
        userInput = { ...userInput, iosPushToken: fcmToken };
      }

      if (Platform.OS == 'android' && fcmToken && fcmToken !== currentUser?.androidPushToken) {
        userInput = { ...userInput, androidPushToken: fcmToken };
      }

      if (Object.keys(userInput).length > 0 && currentUser != null) {
        modifyUserMutation({ variables: { modifyUserInput: userInput } })
          .then(() => {
            console.info("User updated..", fcmToken);
          })
          .catch(err => {
            console.info("User Error..", err);
          });
      }

    } catch (error) {
      console.log("Error", error);
    }
  };



  useEffect(() => {
    messaging().getInitialNotification()
      .then(async (remoteMessage) => {
        console.info('Notification caused app to open from killed state: ==>>', remoteMessage);

      });

    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.info('A new FCM message arrived!', JSON.stringify(remoteMessage));

      PushNotification.createChannel({
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
      }
      )

      PushNotification.configure({
        onNotification: function (notification) {
          console.info('Notification received:', remoteMessage);

          // Finish the notification (iOS only)
          Platform.OS == 'ios' && notification.finish(PushNotification.FetchResult.NoData);
        },

        requestPermissions: true, // Request permission for notifications automatically
      });

      PushNotification.localNotification({
        channelId: "channel-id",
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body, // (required)
        showWhen: true,
      })

      if (!remoteMessage?.data?.type || !remoteMessage?.data?.source_id) {
        return
      }

    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.info('Message handled in the background!', remoteMessage);

    });


    // This is called when app is running in the background and user interacts with the notification
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.info('Notification caused app to open from background  state but app is running: ==>>', remoteMessage);

    });


    // This is called when the app is killed and and not running in the background

    return unsubscribe;
  }, []);


  useEffect(() => {
    try {
      requestUserPermission();

    } catch (error) {

    }
  }, [currentUser?.id]);
  // END


  return (
    <>

    </>
  );
}
