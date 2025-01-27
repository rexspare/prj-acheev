import React from 'react';
import { TouchableOpacity } from 'react-native';
import { OnboardingInput, OnboardingStyles, OnboardingWrapper } from './components/OnboardingWrapper';
import { gql } from '@apollo/client';
import { AppText } from '../../shared/components/AppText';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingRoutesParams } from './OnboardingNavigator';
import { OnboardingRoutes } from '../../shared/Routing';

gql`
  mutation ForgotPasswordRequest($email: String) {
    forgotPasswordRequest(email: $email)
  }

  mutation ResetPassword($resetPasswordToken: String!, $newPassword: String!) {
    resetPassword(resetPasswordToken: $resetPasswordToken, newPassword: $newPassword)
  }
`;

interface IProps extends StackScreenProps<OnboardingRoutesParams, OnboardingRoutes.LANDING> {

}
export const OnboardingForgotPassword: React.FC<IProps> = ({ navigation, route }: IProps) => {
  // const [email, setEmail] = useState<string>(testingOnlyData("team@waker.com", ""));
  // const [password, setPassword] = useState<string>(testingOnlyData("testtest", ""));
  // const [resetCode, setResetCode] = useState<string>(testingOnlyData("", ""));
  // const [forgotPasswordRequestMutation] = useForgotPasswordRequestMutation();
  // const [resetPasswordMutation] = useResetPasswordMutation();

  React.useEffect(() => {
    // handleLogin();
  }, []);

  // const handleForgotPassword = () => {
  //   forgotPasswordRequestMutation({ variables: { email } }).then(() => {
  //     setShowCodeEntry(true);
  //     window.alert("A reset code was sent to your email.  Please enter it below, along with a new password.")
  //   }).catch(err => {
  //     console.error(err);
  //     window.alert(`Failed to request a password reset.  Please try again.  ${err}`);
  //   })
  // }

  // const handleResetPassword = () => {
  //   resetPasswordMutation({ variables: { newPassword: password, resetPasswordToken: resetCode } }).then(() => {
  //     window.alert("Successfully reset password.  Please login.")
  //     navigation.navigate(OnboardingRoutes.LOGIN);
  //   }).catch(err => {
  //     console.error(err);
  //     window.alert(`Failed to reset password.  Please check code and try again`);
  //   })
  // }

  return (
    <OnboardingWrapper scroll navigation={navigation} route={route}>

      <AppText bold style={{ textAlign: 'center', marginTop: 50, marginBottom: 30 }}>Enter your Acheev account email address to receive a temporary password</AppText>


      <OnboardingInput
        label='EMAIL'
        placeholder='your@mail.com'
        wrapperStyle={{ marginBottom: 15, marginTop: 10 }}
      />


      <TouchableOpacity style={{ ...OnboardingStyles.baseButton, width: '100%', }}
      >
        <AppText style={{ color: 'white', fontSize: 18 }} bold>Send</AppText>
      </TouchableOpacity>

    </OnboardingWrapper>
  );
}