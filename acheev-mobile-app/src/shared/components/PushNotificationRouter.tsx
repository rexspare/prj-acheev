import React, { useContext } from 'react';
import * as Notifications from 'expo-notifications';
import { Routes } from '../Routing';
import * as RootNavigation from '../../RootNavigation';
import moment from 'moment';
import { AuthContext } from '../auth/Authentication';
import { trackEvent, MixpanelEvent } from '../../vendor/mixpanel';
import { debounce, memoize } from 'lodash';
import ObjectHash from 'object-hash';

export const PushNotificationRouter: React.FC = () => {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const { currentUser } = useContext(AuthContext);

  const track = memoize(() => debounce(trackEvent), (...params) => ObjectHash(params));

  const tryNavigation = (bodyRaw?: string | null) => {
    const body = bodyRaw?.toLowerCase();

    track()(currentUser?.id, MixpanelEvent.PUSH_NOTIFICATION_CLICKED, { body: bodyRaw });

    if (body?.includes("feed")) {
      RootNavigation.navigate(Routes.FEED);
    }
  }

  React.useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const { request } = response.notification;
      tryNavigation(request.content.body)
    });
    return () => subscription.remove();
  }, []);

  React.useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER &&
      moment(lastNotificationResponse.notification.date).isSameOrAfter(moment().subtract(5, 'seconds'))
    ) {
      tryNavigation(lastNotificationResponse.notification.request.content.body)
    }
  }, [lastNotificationResponse]);

  return (
    <>

    </>
  );
}