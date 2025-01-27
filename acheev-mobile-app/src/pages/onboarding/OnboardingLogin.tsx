import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppInput, InputType } from '../../shared/components/AppInput';
import { OnboardingWrapper } from './components/OnboardingWrapper';
import { Colors } from '../../shared/Constants';
import { isEmpty } from 'lodash';
import { testingOnlyData } from '../../shared/Utilities';
import { OnboardingRoutes } from '../../shared/Routing';
import { AppText } from '../../shared/components/AppText';
import { OnboardingRoutesParams } from './OnboardingNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { AppButton } from '../../shared/components/AppButton';
import { useRequestOtpMutation } from '../../types/gqlReactTypings.generated.d';

interface IProps extends StackScreenProps<OnboardingRoutesParams, OnboardingRoutes.LANDING> {
}

const bgImage = require('../../assets/images/onboarding/login.png');

export const OnboardingLogin: React.FC<IProps> = ({ navigation, route }: IProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(testingOnlyData("650-564-4594", ""));

  const [submittedOnce, setSubmittedOnce] = React.useState<boolean>(false);
  const invalidPhone = React.useMemo(() => phoneNumber.length < 10, [phoneNumber]);

  const [requestOtpMutation] = useRequestOtpMutation({ variables: { phoneNumber } });

  console.log({ phoneNumber });


  const handleLogin = () => {
    if (phoneNumber?.includes("-")) {
      return
    }
    setSubmittedOnce(true);
    if (isEmpty(phoneNumber) || invalidPhone) {
      return;
    }

    requestOtpMutation().then(({ data }) => {
      if (!!data?.requestOtp) {
        navigation.navigate(OnboardingRoutes.VERIFY, { phoneNumber })
      } else {
        window.alert("Invalid phone number");
      }
    });

  }

  React.useEffect(() => {
    // handleLogin();
  }, []);

  return (
    <OnboardingWrapper header='login' navigation={navigation} route={route} backgroundImage={bgImage}>
      <View style={{ display: 'flex', flex: 1, }}>
        <AppText bold style={{ fontSize: 30, color: 'white', marginTop: 20 }}>Welcome Back!</AppText>
        <AppText style={{ fontSize: 20, color: 'white', marginTop: 5 }}>Log in to continue</AppText>

        <View style={{ marginTop: 50 }}>
          <AppInput 
          type={InputType.TEXT} 
          placeholder={'Phone Number'} 
          value={phoneNumber} 
          onChange={setPhoneNumber}
          />
          {!!submittedOnce && invalidPhone && <AppText style={{ fontSize: 12, color: Colors.RED }}>Enter your phone number</AppText>}
          {phoneNumber?.includes("-") && <AppText style={{ fontSize: 12, color: Colors.RED }}>Please Do not add "-" in Phone Number</AppText>}

        </View>


        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <AppButton theme='yellow' style={{ minWidth: 240, }} onPress={handleLogin}>Login</AppButton>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20, position: 'absolute', alignItems: 'center', justifyContent: 'center', bottom: 20, left: 0, right: 0 }}>
          <AppText style={{ color: 'white', textAlign: 'center', fontSize: 20, alignItems: 'center' }}>Don't have an account?   </AppText>

          <TouchableOpacity onPress={() => navigation.navigate(OnboardingRoutes.REGISTER)}><AppText semiBold style={{ fontSize: 20, color: Colors.YELLOW }}>Sign Up</AppText></TouchableOpacity>
        </View>
      </View>
    </OnboardingWrapper>
  );
}