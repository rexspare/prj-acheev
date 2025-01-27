import React from 'react';
import { OnboardingWrapper } from './components/OnboardingWrapper';
import { useRegisterMutation, useRequestOtpMutation, UserInput } from '../../types/gqlReactTypings.generated.d';
import { isEmpty } from 'lodash';
import { hookStateChangeInjector, testingOnlyData } from '../../shared/Utilities';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import { OnboardingRoutes } from '../../shared/Routing';
import validator from 'validator'
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingRoutesParams } from './OnboardingNavigator';
import { AppInput, InputType } from '../../shared/components/AppInput';
import { AppText } from '../../shared/components/AppText';
import { Colors } from '../../shared/Constants';
import { AppButton } from '../../shared/components/AppButton';
import useKeyboard from '../../hooks/useKeyboard';

const imgTick = require('../../assets/images/icons/tick.png');
const bgImage = require('../../assets/images/onboarding/register.png');


interface IProps extends StackScreenProps<OnboardingRoutesParams, OnboardingRoutes.REGISTER> {
}

export const OnboardingRegister: React.FC<IProps> = ({ navigation, route }: IProps) => {
  const { keyboardStatus } = useKeyboard()
  const [registerMutation] = useRegisterMutation();
  const [terms, setTerms] = React.useState<boolean>(false);
  const [submittedOnce, setSubmittedOnce] = React.useState<boolean>(false);

  const [userInput, setUserInput] = React.useState<UserInput>({
    firstName: testingOnlyData('Test', ''),
    lastName: testingOnlyData('Test-Last', ''),
    phoneNumber: testingOnlyData('+1-650-564-' + Math.round(Math.random() * 8999 + 1000), ''),
    password: testingOnlyData("testtest", '') + Math.round(Math.random() * 899999 + 100000),
    private: false,
    newsletter: true,
    location: testingOnlyData('USA', ''),
  });

  const change = hookStateChangeInjector<UserInput>(userInput, setUserInput);

  const maybeRenderError = (condition: boolean, text: string) => {
    return !!submittedOnce && condition && <AppText style={{ fontSize: 12, color: Colors.RED }}>{text}</AppText>;
  }

  const [requestOtpMutation] = useRequestOtpMutation({ variables: { phoneNumber: userInput.phoneNumber } });


  const handleRegister = () => {
    if (userInput.phoneNumber?.includes("-")) {
      return
    }
    setSubmittedOnce(true);
    const { phoneNumber } = userInput;
    if (isEmpty(userInput.firstName) || isEmpty(userInput.lastName)) {
      return window.alert("Please fill out name");
    } else if (phoneNumber == null || isEmpty(phoneNumber) || !validator.isMobilePhone(phoneNumber) || phoneNumber.length < 10) {
      return window.alert("Phone numbers have to be 10 digits long and valid");
    }

    registerMutation({ variables: { userInput } }).then(({ data }) => {
      if (!data) {
        throw Error("Registered but no data");
      }

      console.log("Register successful", data.register);

      requestOtpMutation().finally(() => {
        navigation.navigate(OnboardingRoutes.VERIFY, { phoneNumber })
      });
    }).catch(err => {
      if (`${err}`.toLowerCase().includes('users_email_unique')) {
        return window.alert('Email already exists. Please check email and try again.')
      }
      window.alert(`Failed to register. Please try again.  ${err}`)
    });
  }


  return (
    <OnboardingWrapper header='login' navigation={navigation} route={route} backgroundImage={bgImage}>
      <View style={{ display: 'flex', flex: 1, }}>
        <AppText bold style={{ fontSize: 30, color: 'white', marginTop: 20 }}>Welcome</AppText>
        <AppText style={{ fontSize: 20, color: 'white', marginTop: 5, marginBottom: 40 }}>Sign up to continue</AppText>


        <AppInput type={InputType.TEXT} placeholder={'First name'} value={userInput.firstName} onChange={change('firstName')} />
        {maybeRenderError(isEmpty(userInput.firstName), 'Enter your first name')}
        <AppInput type={InputType.TEXT} placeholder={'Last name'} value={userInput.lastName} onChange={change('lastName')} />
        {maybeRenderError(isEmpty(userInput.lastName), 'Enter your last name')}


        <AppInput type={InputType.TEXT} placeholder={'Phone number'} value={userInput.phoneNumber} onChange={change('phoneNumber')} />
        {maybeRenderError(isEmpty(userInput.phoneNumber), 'Enter your phone number')}
        {userInput.phoneNumber?.includes("-") && <AppText style={{ fontSize: 12, color: Colors.RED }}>Please Do not add "-" in Phone Number</AppText>}


        <View style={{ marginTop: 10, flexDirection: 'row', paddingLeft: 10 }}>
          {!!terms ?
            <TouchableOpacity style={{ width: 20, height: 20, borderRadius: 2, backgroundColor: '#41AD49', alignItems: 'center', justifyContent: 'center' }} onPress={() => setTerms(false)}>
              <Image source={imgTick} style={{ height: 10, width: 12.5 }} />
            </TouchableOpacity>
            :
            <TouchableOpacity style={{ width: 20, height: 20, borderRadius: 2, borderWidth: 1, borderColor: 'white', borderStyle: 'solid' }} onPress={() => setTerms(true)} />
          }
          <TouchableOpacity onPress={() => Linking.openURL('https://www.acheevapp.io/terms-and-conditions')}>
            <AppText style={{ color: 'white', paddingLeft: 15, marginTop: -5, paddingRight: 20, alignItems: 'center', justifyContent: 'center' }}>
              By ticking the box, you will be agreeing{'\n'}to the <AppText semiBold style={{ color: Colors.YELLOW }}>Terms & Conditions.</AppText>
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <AppButton disabled={!terms} theme='yellow' style={{ minWidth: 240, opacity: !!terms ? 1.0 : .7, }} onPress={handleRegister}>Sign Up</AppButton>
        </View>

        {
          !keyboardStatus &&
          <View style={{ flexDirection: 'row', marginTop: 20, position: 'absolute', alignItems: 'center', justifyContent: 'center', bottom: 20, left: 0, right: 0 }}>
            <AppText style={{ color: 'white', textAlign: 'center', fontSize: 20, alignItems: 'center' }}>Already have an account?   </AppText>

            <TouchableOpacity onPress={() => navigation.navigate(OnboardingRoutes.LOGIN)}>
              <AppText semiBold style={{ fontSize: 20, color: Colors.YELLOW }}>Log in</AppText>
            </TouchableOpacity>
          </View>
        }
      </View>
    </OnboardingWrapper >
  );
}