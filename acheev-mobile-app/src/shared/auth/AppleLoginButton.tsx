import React from 'react';
import { OnboardingRoutes } from '../Routing';
import { useNavigation } from '@react-navigation/native';
import { OnboardingRoutesParams } from '../../pages/onboarding/OnboardingNavigator';
import * as AppleAuthentication from 'expo-apple-authentication';
import { isIos } from '../Utilities';

interface IProps {
  onAppleLogin: (appleId: string, appleToken: string) => Promise<boolean>;
}

export const AppleLoginButton: React.FC<IProps> = ({ onAppleLogin }: IProps) => {
  const navigator = useNavigation();

  if (!isIos()) {
    return null;
  }

  const handleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in
      console.log(credential);
      const { email, fullName, user: appleId, authorizationCode: token } = credential;
      credential.identityToken
      const firstName = fullName?.givenName ?? undefined;
      const lastName = fullName?.familyName ?? undefined;

      const register = () => {
        console.info("No FB account, registering");
        const params: OnboardingRoutesParams[OnboardingRoutes.REGISTER] = {
          email: email ?? undefined,
          firstName,
          lastName,
          appleId
        };
        navigator.navigate(OnboardingRoutes.REGISTER, params);
      }

      try {
        const result = await onAppleLogin(appleId, token ?? "no_token");
        if (result === false) {
          register();
        }
      } catch (err) {
        console.error(err);
        register();
      }
    } catch (e) {
      if (e.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  }


  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ width: "100%", height: 50, marginTop: 8 }}
      onPress={handleLogin}
    />
  );
}