import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { ProfileIndex } from '../profile/ProfileIndex';
import { DEFAULT_HEADER_TITLE, MAIN_NAV_OPTIONS, STANDARD_BACK, STANDARD_BACK_WHITE, TRANSPARENT_HEADER } from '../../shared/navigation';
import { OnboardingWalkthrough } from '../onboarding/OnboardingWalkthrough';
import Community from '.';
import ChatRoom from './chatRoom';

const Stack = createStackNavigator<NavigatorParams>();
export const CommunityNavigator: React.FC = () => {

  return (
    <>
      <Stack.Navigator initialRouteName={AppRoutes.COMMUNITY_INDEX}
        screenOptions={{
          ...MAIN_NAV_OPTIONS,
          headerTitle: () => null
        }}>

        <Stack.Screen
          name={AppRoutes.COMMUNITY_INDEX}
          component={Community}
          options={{
            headerLeft: () => DEFAULT_HEADER_TITLE,
          }}
        />

        <Stack.Screen
          name={AppRoutes.CHAT_ROOM}
          component={ChatRoom}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
          }}
        />

      </Stack.Navigator>
    </>
  );
}