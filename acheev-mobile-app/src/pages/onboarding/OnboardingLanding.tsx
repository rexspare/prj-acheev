import React from 'react';
import { OnboardingWrapper } from './components/OnboardingWrapper';
import { OnboardingRoutes } from '../../shared/Routing';
import { AppText } from '../../shared/components/AppText';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingRoutesParams } from './OnboardingNavigator';
import { StatusBar } from 'expo-status-bar';
import { AppButton } from '../../shared/components/AppButton';
import { View } from 'react-native';
import useInterval from '../../shared/hooks/useInterval';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../shared/Constants';

const profile1Image = require('../../assets/images/onboarding/profile1.png');
const profile2Image = require('../../assets/images/onboarding/profile2.png');
const profile3Image = require('../../assets/images/onboarding/profile3.png');

const PROFILES = [
  { image: profile1Image, text: 'Build your strength', description: 'Ensure you have the right type of strength to perform at your best, reduce injuries, and never slow you down with our sport specific strength programs.' },
  { image: profile2Image, text: 'Improve your skills', description: 'Hard work outlast natural born talent. Hone in with our skill development programs that’ll separate you from the competition.' },
  { image: profile3Image, text: 'Conquer your sport', description: 'With our all in one performance app, prepare, show up, and show out.' },
]

interface IProps extends StackScreenProps<OnboardingRoutesParams, OnboardingRoutes.LANDING> {
}

export const OnboardingLanding: React.FC<IProps> = ({ navigation, route }: IProps) => {
  const [profileIndex, setProfileIndex] = React.useState<number>(0);
  const resolvedIndex = profileIndex % PROFILES.length;
  const currentProfile = React.useMemo(() => PROFILES[resolvedIndex], [profileIndex])
  useInterval(() => setProfileIndex(currentIndex => currentIndex + 1), 3000);

  const dots = React.useMemo(() => {
    return PROFILES.map((item, index) => {
      const isSelected = index === profileIndex % PROFILES.length;
      const size = isSelected ? 20 : 10;
      return (
        <View style={{ width: 20, marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }} key={index}>
          <TouchableOpacity style={{ height: size, width: size, borderRadius: size, backgroundColor: index <= resolvedIndex ? Colors.YELLOW : 'white', }}></TouchableOpacity>
        </View>
      )
    })
  }, [profileIndex]);



  return (
    <OnboardingWrapper header='login' scroll={true} navigation={navigation} route={route} backgroundImage={currentProfile.image}>
      <StatusBar style="light" />

      <AppText bold={true} style={{ textAlign: 'center', fontSize: 30, color: "white", marginTop: '55%' }}>{currentProfile.text}</AppText>

      <AppText fontSize={18} style={{ textAlign: 'center', marginTop: 15, color: 'white' }}>{currentProfile.description}</AppText>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
        {dots}
      </View>

      <View style={{
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '3%'
      }}>
        <AppButton
          theme='yellow'
          style={{ width: '48%' }}
          onPress={() => navigation.navigate(OnboardingRoutes.REGISTER)}>Sign Up</AppButton>
        <AppButton
          theme='black'
          style={{ width: '48%' }}
          onPress={() => navigation.navigate(OnboardingRoutes.LOGIN)}>Log In</AppButton>
      </View>

    </OnboardingWrapper>

  );
}