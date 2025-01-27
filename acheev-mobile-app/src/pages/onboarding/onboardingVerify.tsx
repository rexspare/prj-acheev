import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../shared/Constants';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingRoutesParams } from './OnboardingNavigator';
import { AppRoutes, OnboardingRoutes } from '../../shared/Routing';
import { AppText } from '../../shared/components/AppText';
import { OnboardingWrapper } from './components/OnboardingWrapper';
import { AppButton } from '../../shared/components/AppButton';
import useInterval from '../../shared/hooks/useInterval';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ObjectHash from 'object-hash';
import { useLoginMutation, useRequestOtpMutation, useVerifyOtpMutation } from '../../types/gqlReactTypings.generated.d';
import { AuthContext } from '../../shared/auth/Authentication';
import { setCurrentUser } from '../../shared/storage';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const styles = StyleSheet.create({
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginVertical: 40, justifyContent: 'center' },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 0,
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#9C9C9C44',
    marginHorizontal: 5
  },
  focusCell: {
    borderColor: 'white',
  },
});


interface Props extends StackScreenProps<OnboardingRoutesParams, OnboardingRoutes.VERIFY> {

}

const bgImage = require('../../assets/images/onboarding/verify.png');


export const OnboardingVerify: React.FC<Props> = ({ navigation, route }) => {
  const { signIn, currentUser, setCurrentUser: setCurrentUserDirect } = React.useContext(AuthContext);
  const [code, setCode] = React.useState<string>('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const { phoneNumber } = route.params;
  const [timerSeconds, setTimerSeconds] = React.useState<number>(0);

  const [verifyOtpMutation] = useVerifyOtpMutation({ variables: { phoneNumber, otp: code } });
  const [requestOtpMutation] = useRequestOtpMutation({ variables: { phoneNumber } });


  React.useEffect(() => {
    if (currentUser != null) {
      navigation.navigate(AppRoutes.FEED_INDEX as any);
    }
  }, [ObjectHash(currentUser ?? {}) ?? "no"]);


  useInterval(() => setTimerSeconds(curr => curr + 1), 1000);

  const secondsRemaining = Math.max(60 - timerSeconds, 0);
  const disabled = code.length < CELL_COUNT;

  const handleSubmit = () => {
    verifyOtpMutation().then(({ data }) => {
      if (data == null) {
        return window.alert("Failed to login");
      }

      console.log("Login successful", data.verifyOtp);
      signIn(data.verifyOtp.token, data.verifyOtp.user);
      setCurrentUser(data.verifyOtp.user);
      setCurrentUserDirect(data.verifyOtp.user);
      navigation.navigate(AppRoutes.FEED_INDEX as any);
    }).catch(err => {
      window.alert("Failed to log in. Please check credentials and try again.")
      console.info(err);
    });
  }

  const resend = () => {
    requestOtpMutation().then(({ data }) => {
      setTimerSeconds(0);
    }).catch(err => {
      console.error(err);
      window.alert("Failed to resend OTP. Please try again.")
    });
  }

  const resendDisabled = secondsRemaining > 50;

  return (
    <OnboardingWrapper header='login' navigation={navigation} route={route} backgroundImage={bgImage}>
      <View style={{ display: 'flex', flex: 1, }}>
        <AppText bold style={{ fontSize: 30, color: 'white', textAlign: 'center' }}>Verification</AppText>

        <AppText style={{ fontSize: 18, textAlign: 'center', color: 'white', marginTop: 40 }}>To verify, please enter the OTP sent to <Text style={{ color: Colors.YELLOW }}>{phoneNumber}</Text> below.</AppText>

        <View>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
                allowFontScaling={false}
                >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <AppButton disabled={disabled} theme='yellow' style={{ minWidth: 240, opacity: disabled ? .6 : 1. }} onPress={handleSubmit}>Submit</AppButton>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <AppText style={{ color: 'white', }}>{secondsRemaining > 0 ? `${secondsRemaining}s` : 'expired'}</AppText>
          <TouchableOpacity onPress={resend} disabled={resendDisabled}>
            <AppText style={{ color: resendDisabled ? '#9C9C9C' : Colors.YELLOW, paddingLeft: 15, paddingVertical: 10 }}>Resend OTP</AppText>
          </TouchableOpacity>
        </View>

      </View>
    </OnboardingWrapper>

  );
}
