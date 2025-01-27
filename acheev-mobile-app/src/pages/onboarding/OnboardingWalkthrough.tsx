import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { OnboardingWrapper } from './components/OnboardingWrapper';
import { AppText } from '../../shared/components/AppText';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingRoutesParams } from './OnboardingNavigator';
import { OnboardingRoutes } from '../../shared/Routing';
import { Colors } from '../../shared/Constants';
import { STANDARD_BACK_WHITE_IMAGE } from '../../shared/navigation';
import { AppButton } from '../../shared/components/AppButton';


const party = require('../../assets/images/onboarding/party.png');
const walkthrough0 = require('../../assets/images/onboarding/walkthrough0.png');
const walkthrough1 = require('../../assets/images/onboarding/walkthrough1.png');
const walkthrough2 = require('../../assets/images/onboarding/walkthrough2.png');
const walkthrough3 = require('../../assets/images/onboarding/walkthrough3.png');

const ACTIVITIES = ["Run", "Sprint", "Football", "Soccer", "Basketball", "Swim", "Yoga", "Climb", "Volleyball", "Baseball", "Hike"];
const SKILLS = ["Strength", "Explosiveness", "Endurance", "Coordination", "Agility", "Power", "Speed", "Balance", "Mobility", "Recovery"];
const LEVELS = ["Beginner", "Intermediate", "Advanced", "Professional", "Not Sure"];

interface IProps extends StackScreenProps<OnboardingRoutesParams, OnboardingRoutes.LANDING> {
}

export const OnboardingWalkthrough: React.FC<IProps> = ({ navigation, route }: IProps) => {
  const [step, setStep] = React.useState<number>(0);
  const [activities, setActivities] = React.useState<Array<string>>([]);
  const [skills, setSkills] = React.useState<Array<string>>([]);
  const [level, setLevel] = React.useState<string>();

  const isFinished = step === 3;

  const bgImage = React.useMemo(() => {
    switch (step) {
      case 0: return walkthrough0;
      case 1: return walkthrough1;
      case 2: return walkthrough2;
      case 3: return walkthrough3;
    }
  }, [step]);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (step <= 1) ? null : <TouchableOpacity onPress={() => setStep(step - 1)} style={{ height: 20, width: 50 }}>{STANDARD_BACK_WHITE_IMAGE}</TouchableOpacity>,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 10, height: 20 }}>
          <AppText style={{ color: Colors.YELLOW, fontSize: 16 }}>Skip</AppText>
        </TouchableOpacity>
      ),
      title: step < 1 ? ' ' : `Step ${step} / 3`,
    });
  }, [navigation, step]);


  const renderTag = (name: string, onPress: () => void, active: boolean, marginRight: number = 15, height: number = 40, minWidth?: number) => {

    return (
      <TouchableOpacity key={name} onPress={onPress} style={{ backgroundColor: active ? Colors.YELLOW : 'transparent', borderWidth: 2, borderColor: active ? Colors.YELLOW : 'white', borderStyle: 'solid', marginRight, minWidth, height, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, borderRadius: 5, marginVertical: 8 }}>
        <AppText style={{ color: active ? 'black' : 'white', fontSize: 18 }}>{name}</AppText>
      </TouchableOpacity>
    )
  }

  const toggleActivity = (activity: string) => {
    return () => setActivities(activities.includes(activity) ? activities.filter(item => item !== activity) : [...activities, activity]);
  }

  const toggleSkill = (skill: string) => {
    return () => setSkills(skills.includes(skill) ? skills.filter(item => item !== skill) : [...skills, skill]);
  }


  return (
    <OnboardingWrapper header='login' navigation={navigation} route={route} backgroundImage={bgImage}>
      <View style={{ marginTop: 20, marginBottom: 30 }}>
        {step === 0 &&
          <View style={{ alignItems: 'center' }}>
            <Image source={party} style={{ width: 100, height: 100 }} />
            <AppText bold={true} style={{ color: 'white', fontSize: 30, marginBottom: 20, marginTop: 20 }} semiBold>Welcome!</AppText>
            <AppText style={{ fontSize: 18, color: 'white', textAlign: 'center', marginBottom: 30 }}>The following quick assessment will help us to personalize your health program and to give you best suggestions.</AppText>
          </View>
        }

        {step === 1 &&
          <>
            <AppText style={{ color: 'white', fontSize: 20, marginBottom: 20 }} semiBold>What do you do?</AppText>
            <View style={{ flexWrap: 'wrap', width: '100%', flexDirection: 'row' }}>
              {ACTIVITIES.map(item => renderTag(item, toggleActivity(item), activities.includes(item)))}
            </View>
          </>
        }
        {step === 2 && <>
          <>
            <AppText style={{ color: 'white', fontSize: 20, marginBottom: 20 }} semiBold>What will you like to improve?</AppText>
            <View style={{ flexWrap: 'wrap', width: '100%', flexDirection: 'row' }}>
              {SKILLS.map(item => renderTag(item, toggleSkill(item), skills.includes(item)))}
            </View>
          </>
        </>}

        {step === 3 && <>
          <>
            <AppText style={{ color: 'white', fontSize: 20, marginBottom: 20 }} semiBold>What do you think your skill level is?</AppText>
            <View style={{ alignItems: 'center', flexDirection: 'column' }}>
              {LEVELS.map(item => renderTag(item, () => setLevel(item), level === item, 0, 50, 200))}
            </View>
          </>
        </>}
      </View>


      <View style={{ alignItems: 'center', marginTop: 3 }}>

        <AppButton theme='yellow' style={{ minWidth: 240, }} onPress={() => isFinished ? navigation.goBack() : setStep(step + 1)}>
          Continue
        </AppButton>
      </View>


    </OnboardingWrapper>
  );
}