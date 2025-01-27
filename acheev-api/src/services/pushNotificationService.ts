/*
import { UserModel } from "../models/userModel";
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';
import { compact, flatten } from 'lodash';

const expo = new Expo();

export class PushNotificationService {

  public static pushNotifyUserIds = async (userIds: string[], body?: string, title?: string, data?: Record<string, any>) => {
    try {
      const users = await UserModel.query().findByIds(userIds);
      return PushNotificationService.pushNotify(users, body, title, data)
    } catch (err) {
      console.error('[PushNotification]', err);
    }
  }

  public static pushNotify = async (users: UserModel[], body?: string, title?: string, data?: Record<string, any>) => {
    const pushTokens = compact(
      flatten(
        users.map(user => [user.iosPushToken, user.androidPushToken])
      )
    )
      .filter(Expo.isExpoPushToken);


    if (pushTokens.length === 0) {
      return;
    }

    return PushNotificationService.pushNotifyTokens(pushTokens, body, title, data);
  }

  public static pushNotifyTokens = async (pushTokens: string[], body?: string, title?: string, data?: Record<string, any>) => {
    try {
      const pushMessage: ExpoPushMessage = {
        to: pushTokens,
        sound: 'default',
        title,
        body,
        data: { title, body, ...data },
      };

      const chunks = expo.chunkPushNotifications([pushMessage]);

      let ticketChunks: ExpoPushTicket[] = [];
      for (const chunk of chunks) {
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log('[PushNotification]', ticketChunk);
          ticketChunks = ticketChunks.concat(ticketChunks);
        } catch (error) {
          console.error('push notification error', error);
        }
      }
    } catch (err) {
      console.error('[PushNotification]', err)
    }
  }
}

Above code is old and not being used
*/

import firebaseAdmin from "firebase-admin";
import { UserModel } from "../models/userModel";
import { compact, flatten } from "lodash";
import { MulticastMessage } from "firebase-admin/lib/messaging/messaging-api";

// Load Firebase service account key
const serviceAccount = require(process.env.FIREBASE_CONFIG_FILE_PATH || "");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export class PushNotificationService {
  public static pushNotifyChatMessage = async (title: string, body: string, data: Record<string, string>) => {
    try {
      const users = await UserModel.query().where({ notifications: true, }).whereNot("id", data.senderId);
      return PushNotificationService.prepareMessage(users, title, body, data);
    } catch (err) {
      console.error("Error preparing notifications", err);
    }
  };

  public static prepareMessage = async (
    users: UserModel[],
    title: string,
    body: string,
    data: Record<string, string>,
  ) => {
    const tokens = compact(flatten(users.map((user) => [user.iosPushToken, user.androidPushToken])));

    if (tokens.length === 0) {
      return;
    }

    const message: MulticastMessage = {
      notification: {
        title,
        body,
      },
      data: data || {},
      tokens,
    };

    return PushNotificationService.sendNotification(message);
  };

  public static sendNotification = async (message: MulticastMessage) => {
    try {
      const response = await firebaseAdmin.messaging().sendEachForMulticast(message);
      console.log(response);
    } catch (err) {
      console.error("Error sending notifications", err);
    }
  };
}
