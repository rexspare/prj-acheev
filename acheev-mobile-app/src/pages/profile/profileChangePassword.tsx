import React from 'react';
import { SafeView } from '../../shared/components/SafeView';
import type { StackScreenProps } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { ChangePasswordInput, useChangePasswordMutation } from '../../types/gqlReactTypings.generated.d';
import { AppInput, InputType } from '../../shared/components/AppInput';
import { hookStateChangeInjector } from '../../shared/Utilities';
import { AppButton } from '../../shared/components/AppButton';

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

export const ProfileChangePassword: React.FC<Props> = ({ route, navigation }: Props) => {
  const [input, setInput] = React.useState<ChangePasswordInput>({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: ''
  });

  const [changePasswordMutation] = useChangePasswordMutation({ variables: { changePasswordInput: input } });


  const change = hookStateChangeInjector(input, setInput);

  const onSave = () => {
    if (input.currentPassword.length === 0) {
      return window.alert("Please enter your current password");
    } else if (input.newPassword.length === 0) {
      return window.alert("Please enter a new password");
    } else if (input.newPassword !== input.newPasswordConfirmation) {
      return window.alert("Your new password does not match the confirmation");
    }

    changePasswordMutation().then(() => {
      navigation.goBack();
    }).catch(err => {
      console.error(err);
      window.alert("Failed to change password, please try again");
    })
  }

  return (
    <>
      <SafeView backgroundColor={'black'} padded={true} scroll={true} style={{
        paddingTop: 20,
      }}>

        <AppInput type={InputType.PASSWORD} placeholder={'Current Password'} value={input.currentPassword} onChange={change('currentPassword')} wrapperStyle={{ marginBottom: 10 }} />

        <AppInput type={InputType.PASSWORD} placeholder={'New Password'} value={input.newPassword} onChange={change('newPassword')} wrapperStyle={{ marginBottom: 10 }} />

        <AppInput type={InputType.PASSWORD} placeholder={'Confirm New Password'} value={input.newPasswordConfirmation} onChange={change('newPasswordConfirmation')} wrapperStyle={{ marginBottom: 10 }} />

        <AppButton
          disabled={input.currentPassword.length === 0 || input.newPassword.length === 0 || input.newPassword !== input.newPasswordConfirmation}
          onPress={onSave}
          theme='yellow' style={{ marginTop: 40, marginBottom: 30, marginHorizontal: 75 }}>Update</AppButton>

      </SafeView>
    </>
  );
}