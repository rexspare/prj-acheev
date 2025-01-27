import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingRoutes } from '../../shared/Routing';
import { OnboardingLogin, } from './OnboardingLogin';
import { OnboardingRegister } from './OnboardingRegister';
import { OnboardingForgotPassword } from './OnboardingForgotPassword';
import { OnboardingLanding } from './OnboardingLanding';
import { Image } from 'react-native';
import { TRANSPARENT_HEADER } from '../../shared/navigation';
import { OnboardingVerify } from './onboardingVerify';

const imageHeaderLogo = require('../../assets/images/logo.png');


export type OnboardingRoutesParams = {
  [OnboardingRoutes.LANDING]: undefined;
  [OnboardingRoutes.LOGIN]: undefined;
  [OnboardingRoutes.REGISTER]: undefined;
  // [OnboardingRoutes.REGISTER]: { email?: string; firstName?: string; lastName?: string; facebookId?: string; appleId?: string; imageUrl?: string };
  [OnboardingRoutes.FORGOT_PASSWORD]: undefined;
  [OnboardingRoutes.WALKTHROUGH]: undefined;
  [OnboardingRoutes.VERIFY]: { phoneNumber: string; };
}

export const DEFAULT_TITLE = <Image source={imageHeaderLogo} style={{ height: '70%', width: 100, resizeMode: 'contain' }} />;

const Stack = createStackNavigator<OnboardingRoutesParams>();

export const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name={OnboardingRoutes.LANDING} component={OnboardingLanding} options={{ headerShown: false }} />
      <Stack.Screen name={OnboardingRoutes.LOGIN} component={OnboardingLogin} options={{
        ...TRANSPARENT_HEADER
      }} />
      <Stack.Screen name={OnboardingRoutes.VERIFY} component={OnboardingVerify} options={{
        ...TRANSPARENT_HEADER,
        headerBackImage: () => null
      }} />
      <Stack.Screen name={OnboardingRoutes.REGISTER} component={OnboardingRegister} options={{
        ...TRANSPARENT_HEADER,
      }} />
      <Stack.Screen name={OnboardingRoutes.FORGOT_PASSWORD} component={OnboardingForgotPassword}
        options={TRANSPARENT_HEADER}
      />
    </Stack.Navigator>
  );
};

