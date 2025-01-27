import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { SafeView } from '../../shared/components/SafeView';
import { Colors } from '../../shared/Constants';
import type { StackScreenProps } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { AppText } from '../../shared/components/AppText';
import { formatGqlError, hookStateChangeInjector } from '../../shared/Utilities';
import { ModifyUserInput, useModifyUserMutation } from '../../types/gqlReactTypings.generated.d';
import { AuthContext } from '../../shared/auth/Authentication';
import { AppInput, InputType } from '../../shared/components/AppInput';
import Spinner from 'react-native-loading-spinner-overlay';

import * as ImagePicker from 'expo-image-picker';
import { uploadUri } from '../../shared/ImageUploader';
import { AppButton } from '../../shared/components/AppButton';
import moment from 'moment';

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

export const ProfileSettings: React.FC<Props> = ({ route, navigation }: Props) => {
  const { currentUser, refreshCurrentUser, signOut } = React.useContext(AuthContext);

  const [input, setInput] = React.useState<ModifyUserInput>({
    email: currentUser?.email,
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    phoneNumber: currentUser?.phoneNumber,
    private: currentUser?.private,
    birthday: currentUser?.birthday,
  });
  const [imageUriLocal, setImageUriLocal] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [modifyUserMutation] = useModifyUserMutation({ variables: { modifyUserInput: { ...input, birthday: input.birthday != null ? moment(input.birthday).toDate() : input.birthday }, userId: currentUser?.id } });

  const change = hookStateChangeInjector<ModifyUserInput>(input, setInput);

  const onSave = () => {
    modifyUserMutation().then(() => {
      window.alert("Successfully saved");
      refreshCurrentUser();
    }).catch(err => {
      console.error(err);
      window.alert(`Failed to save.  Please try again.  ${formatGqlError(err)}`);
    });
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={signOut}>
          <AppText fontSize={14} semiBold style={{ marginRight: 15, color: Colors.RED }}>Logout</AppText>
        </TouchableOpacity >
      ),
    });
  }, [navigation]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: .7,
    });

    console.log(result);

    if (!result.cancelled) {
      setIsLoading(true);
      const localUri = result.uri || result?.assets?.length > 0 ? result?.assets[0]?.uri : undefined;
      await uploadUri(localUri, 'image').then(imageUri => {
        console.info("Done uploading", imageUri);
        change('imageUrl')(imageUri);
        setImageUriLocal(localUri);
        setIsLoading(false);
      }).catch(() => {
        console.info("catch");
        setIsLoading(false);
      })
    }
  };

  console.info("is loading", isLoading);

  return (
    <>
      <SafeView backgroundColor={'black'} padded={true} scroll={true} style={{
        paddingTop: 10,
      }}>
        <Spinner
          visible={!!isLoading}
          textContent={'Uploading...'}
          textStyle={{ color: 'white' }}
          key={isLoading ? 'true' : 'false'}
        />


        <View style={{ width: '100%', alignItems: 'center', paddingVertical: 30 }}>
          <TouchableOpacity style={{ height: 100, flexDirection: 'row', alignItems: 'center' }} onPress={pickImage}>
            <Image source={{ uri: imageUriLocal ?? currentUser?.imageUrl }} style={{ width: 100, height: 100, borderRadius: 100, borderColor: 'white', borderWidth: 1 }} />
          </TouchableOpacity>
        </View>

        <AppInput type={InputType.TEXT} placeholder={'First Name'} value={input.firstName} onChange={change('firstName')} />

        <AppInput type={InputType.TEXT} placeholder={'Last Name'} value={input.lastName} onChange={change('lastName')} />

        <AppInput type={InputType.TEXT} placeholder={'Email'} value={input.email} onChange={change('email')} />

        <AppInput type={InputType.TEXT} placeholder={'Phone'} value={input.phoneNumber} onChange={change('phoneNumber')} />

        <AppInput type={InputType.DATE} placeholder={'Birthday'} value={input.birthday} onChange={change('birthday')} hideTime={true} />


        <View style={{ width: '100%', alignItems: 'center' }}>
          <AppButton theme='yellow'
            textProps={{ style: { fontSize: 16, lineHeight: 18 } }}
            style={{ minWidth: 220, marginTop: 25, }} onPress={onSave}>Update</AppButton>
        </View>

      </SafeView>
    </>
  );
}