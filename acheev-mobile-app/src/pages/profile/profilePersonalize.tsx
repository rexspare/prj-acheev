import React from 'react';
import { SafeView } from '../../shared/components/SafeView';
import type { StackScreenProps } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { AuthContext } from '../../shared/auth/Authentication';
import { Linking, Switch, View } from 'react-native';
import { Colors } from '../../shared/Constants';
import { AppText } from '../../shared/components/AppText';
import { ModifyUserInput, SkillLevel, useModifyUserMutation, WeightUnit } from '../../types/gqlReactTypings.generated.d';
import { AppInput, InputType } from '../../shared/components/AppInput';
import { hookStateChangeInjector } from '../../shared/Utilities';
import { startCase } from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

export const ProfilePersonalize: React.FC<Props> = ({ route, navigation }: Props) => {
  const { currentUser } = React.useContext(AuthContext);
  const [modifyUserMutation] = useModifyUserMutation();

  const [input, setInput] = React.useState<ModifyUserInput>({
    notifications: currentUser?.notifications,
    weightUnit: currentUser?.weightUnit,
    skillLevel: currentUser?.skillLevel,
  });

  const change = hookStateChangeInjector(input, setInput);

  const renderRow = React.useCallback((title: string, node: JSX.Element) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
        <AppText style={{ color: 'white', flex: .5, fontSize: 18 }}>{title}</AppText>
        <View style={{ alignItems: 'flex-end', flex: .5 }}>
          {node}
        </View>
      </View>
    )
  }, []);

  const renderSection = (title: String, content: JSX.Element | JSX.Element[]) => {
    return (
      <View style={{ backgroundColor: Colors.BACKGROUND, borderRadius: 10, marginBottom: 20, flexDirection: 'column', padding: 20 }}>
        <AppText style={{ fontSize: 18, color: 'white', marginBottom: 20 }} semiBold>{title}</AppText>
        {content}
      </View>
    )
  }

  return (
    <>
      <SafeView backgroundColor={'black'} padded={true} scroll={true} style={{
        paddingTop: 20,
      }}>
        {renderSection('Notifications',
          <>
            {renderRow('Notifications',
              <Switch value={input.notifications}
                onValueChange={val => {
                  change('notifications')(val);
                  modifyUserMutation({ variables: { modifyUserInput: { notifications: val } } })
                  .then(() => {console.info("UPDATED");})
                  .catch(err => {
                    console.info(err);
                  })
                }}
              />
            )}
          </>
        )}

        {renderSection('User Preferences',
          <>
            {renderRow('Default Skill Level:',
              <AppInput type={InputType.SELECT}
                selectionItems={Object.entries(SkillLevel).map(([key, val]) => ({ label: startCase(val), value: val }))}
                value={input.skillLevel} onChange={val => {
                  change('skillLevel')(val);
                  modifyUserMutation({ variables: { modifyUserInput: { skillLevel: val as SkillLevel } } }).catch(err => {
                    console.error(err);
                  })
                }} />
            )}
            {renderRow('Units:',
              <AppInput type={InputType.SELECT}
                selectionItems={Object.entries(WeightUnit).map(([key, val]) => ({ label: startCase(val), value: val }))}
                value={input.weightUnit} onChange={val => {
                  change('weightUnit')(val);
                  modifyUserMutation({ variables: { modifyUserInput: { weightUnit: val as WeightUnit } } }).catch(err => {
                    console.error(err);
                  })
                }} />
            )}
          </>
        )}

        {renderSection('Others',
          <View style={{ paddingLeft: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate(AppRoutes.PROFILE_CHANGE_PASSWORD)}>
              <AppText style={{ fontSize: 18, color: 'white' }}>Change Password</AppText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://www.acheevapp.io/terms-and-conditions')}>
              <AppText style={{ fontSize: 18, color: 'white', marginVertical: 20 }}>Terms and Conditions</AppText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL('https://www.acheevapp.io/privacy-policy')}>
              <AppText style={{ fontSize: 18, color: 'white' }}>Privacy Policy</AppText>
            </TouchableOpacity>
          </View>
        )}

      </SafeView>
    </>
  );
}