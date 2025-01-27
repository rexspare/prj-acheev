import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeView } from '../../shared/components/SafeView';
import { Colors } from '../../shared/Constants';
import type { StackScreenProps } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { AppText } from '../../shared/components/AppText';
import { AppInput, InputType } from '../../shared/components/AppInput';
import { UpdateWeightInput, useUpdateWeightMutation } from '../../types/gqlReactTypings.generated.d';
import { hookStateChangeInjector } from '../../shared/Utilities';
import moment from 'moment';
import { AppImagePicker } from '../../shared/components/appImagePicker';

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.PROFILE_WEIGHT_STAT_UPDATE> {

}

const iconPlaceholder = require(`../../assets/images/icons/placeholder_image.png`);

export const ProfileWeightUpdate: React.FC<Props> = ({ route, navigation }: Props) => {
  const { weightStat } = route.params;
  const [input, setInput] = React.useState<UpdateWeightInput>(
    {
      weight: weightStat?.weight ?? 0,
      date: weightStat?.date ?? new Date(),
      imageUrl: weightStat?.imageUrl,
      notes: weightStat?.notes
    }
  )
  const [updateWeightMutation] = useUpdateWeightMutation({ variables: { weightStatId: weightStat?.id, updateWeightInput: { ...input, date: moment(input.date).toDate() } } });

  const change = hookStateChangeInjector(input, setInput);

  const onSave = React.useCallback(() => {
    updateWeightMutation().then(() => {
      navigation.goBack();
    }).catch(err => {
      console.error(err);
      window.alert("Failed to save weight update");
    });
  }, [input]);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSave}>
          <AppText fontSize={16} semiBold style={{ marginRight: 15, color: Colors.YELLOW, }}>Save</AppText>
        </TouchableOpacity >
      ),
    });
  }, [navigation, onSave]);


  const renderRow = React.useCallback((title: string, node: JSX.Element) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <AppText style={{ color: 'white', flex: .5 }}>{title}</AppText>
        {node}
      </View>
    )
  }, []);


  return (
    <>
      <SafeView backgroundColor={'black'} padded={true} scroll={true} style={{
        paddingTop: 10,
      }}>

        {renderRow('Weight (lbs)',
          <AppInput type={InputType.NUMBER} placeholder={'Weight'} value={input.weight} onChange={change('weight')} wrapperStyle={{ flex: .5 }} />
        )}

        {renderRow('Date',
          <AppInput type={InputType.DATE} placeholder={'Date'} value={input.date} onChange={change('date')} wrapperStyle={{ flex: .5 }}
          />
        )}

        {renderRow('Progress',
          <AppImagePicker
            onImageSelected={(val) => change('imageUrl')(val)}
            defaultImage={input.imageUrl != null ? { uri: input.imageUrl } : iconPlaceholder}
            touchableOpacityProps={{ style: { flex: .5, alignItems: 'flex-end', } }}
            imageProps={{ style: { width: 100, height: 100, resizeMode: 'contain' } }}
          />
        )}


      </SafeView>
    </>
  );
}