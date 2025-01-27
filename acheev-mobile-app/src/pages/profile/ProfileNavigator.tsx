import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoutes } from '../../shared/Routing';
import { ProfileIndex } from './ProfileIndex';
import { ProfileSettings } from './profileSettings';
import { MAIN_NAV_OPTIONS, STANDARD_BACK, STANDARD_BACK_WHITE } from '../../shared/navigation';
import { ProfileWeightStats } from './profileWeightStats';
import { ProfileWeightUpdate } from './profileWeightUpdate';
import { ProfileCalendar } from './profileCalendar';
import { ProfileFAQ } from './profileFAQ';
import { ProfileFeedback } from './profileFeedback';
import { ProfileWelcomeVideos } from './profileWelcomeVideos';
import { ProfileWorkoutStats } from './profileWorkoutStats';
import { ProfilePersonalize } from './profilePersonalize';
import { ProfileSubscription } from './profileSubscription';
import { ProfileChangePassword } from './profileChangePassword';
import { WorkoutRating } from '../feed/workoutRating';
import { ProgramRating } from '../feed/programRating';


const Stack = createStackNavigator();

export const ProfileNavigator: React.FC = () => {

  return (
    <>
      <Stack.Navigator initialRouteName={AppRoutes.PROFILE_INDEX}
        screenOptions={{
          headerStyle: { backgroundColor: 'white' },
          headerBackgroundContainerStyle: { backgroundColor: 'white' },
          title: 'My Account',
          ...MAIN_NAV_OPTIONS
        }}>
        <Stack.Screen
          name={AppRoutes.PROFILE}
          component={ProfileIndex}
          options={{
            headerBackImage: STANDARD_BACK,
            headerBackTitle: ' ',
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROFILE_SETTINGS}
          component={ProfileSettings}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'Settings'
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROFILE_WEIGHT_STATS}
          component={ProfileWeightStats}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'Weight Stats'
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROFILE_WEIGHT_STAT_UPDATE}
          component={ProfileWeightUpdate}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'Update Weight'
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROFILE_CALENDAR}
          component={ProfileCalendar}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'My Calendar'
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROFILE_FAQ}
          component={ProfileFAQ}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'FAQs'
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROFILE_FEEDBACK}
          component={ProfileFeedback}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'Feedback'
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROFILE_WELCOME_VIDEOS}
          component={ProfileWelcomeVideos}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'Welcome Videos'
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROFILE_WORKOUT_STATS}
          component={ProfileWorkoutStats}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'Workout Stats'
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROFILE_PERSONALIZE}
          component={ProfilePersonalize}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'Settings'
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROFILE_SUBSCRIPTION}
          component={ProfileSubscription}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'My Subscription'
          }}
        />

        <Stack.Screen
          name={AppRoutes.PROFILE_CHANGE_PASSWORD}
          component={ProfileChangePassword}
          options={{
            headerBackImage: STANDARD_BACK_WHITE,
            headerBackTitle: ' ',
            title: 'Change Password'
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

      </Stack.Navigator>
    </>
  );
}