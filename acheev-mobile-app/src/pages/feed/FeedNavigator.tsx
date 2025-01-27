import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { FeedIndex } from './FeedIndex';
import { ProfileIndex } from '../profile/ProfileIndex';
import { DEFAULT_HEADER_TITLE, MAIN_NAV_OPTIONS, STANDARD_BACK, STANDARD_BACK_WHITE, TRANSPARENT_HEADER } from '../../shared/navigation';
import { OnboardingWalkthrough } from '../onboarding/OnboardingWalkthrough';
import { FeedProgramListAll } from './FeedProgramListAll';
import { ProgramListing } from './programListing';
import { ProgramSearchPage } from './programSearchPage';
import { WorkoutListing } from './workoutListing';
import { WorkoutRating } from './workoutRating';
import { ProgramInfo } from './programInfo';
import { ProgramRating } from './programRating';

const Stack = createStackNavigator<NavigatorParams>();
export const FeedNavigator: React.FC = () => {

  return (
    <>
      <Stack.Navigator initialRouteName={AppRoutes.FEED_INDEX}
        screenOptions={{
          ...MAIN_NAV_OPTIONS,
          headerTitle: () => null
        }}>
        <Stack.Screen
          name={AppRoutes.FEED_INDEX}
          component={FeedIndex}
          options={{
            headerLeft: () => DEFAULT_HEADER_TITLE,
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROFILE}
          component={ProfileIndex}
          options={{
            headerBackImage: STANDARD_BACK,
            headerBackTitle: ' ',
            title: ' ',
            headerShown: true,
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROGRAMS_ALL}
          component={FeedProgramListAll}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROGRAM_LISTING}
          component={ProgramListing}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROGRAM_INFO}
          component={ProgramInfo}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROGRAM_SEARCH}
          component={ProgramSearchPage}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerTitle: 'Search',
            headerBackTitle: ' ',
          }}
        />

        <Stack.Screen
          name={AppRoutes.WORKOUT_LISTING}
          component={WorkoutListing}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
          }}
        />

        <Stack.Screen
          name={AppRoutes.WORKOUT_RATING}
          component={WorkoutRating}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'Rate Workout'
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROGRAM_RATING}
          component={ProgramRating}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'Rate Program'
          }}
        />

        <Stack.Screen name={AppRoutes.WALKTHROUGH} component={OnboardingWalkthrough} options={{
          ...TRANSPARENT_HEADER,
        }} />

      </Stack.Navigator>
    </>
  );
}