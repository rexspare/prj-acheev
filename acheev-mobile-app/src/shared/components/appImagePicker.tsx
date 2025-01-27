import React from 'react';
import { ImageProps, TouchableOpacity, Image, TouchableOpacityProps, ImageSourcePropType } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadUri } from '../../shared/ImageUploader';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export enum IconType {
  FONT_AWESOME,
  IONICONS
}

interface Props {
  defaultImage?: ImageSourcePropType,
  onImageSelected: (imageUrl: string) => void;
  imageProps?: Omit<ImageProps, 'source'>
  touchableOpacityProps?: TouchableOpacityProps
}
export const AppImagePicker: React.FC<Props> = ({ defaultImage, onImageSelected, imageProps, touchableOpacityProps }: Props) => {
  const [imageUriLocal, setImageUriLocal] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
      const localUri = result.uri;
      await uploadUri(localUri, 'image').then(imageUri => {
        console.info("Done uploading", imageUri);
        setImageUriLocal(localUri);
        onImageSelected(localUri);
        setIsLoading(false);
      }).catch(() => {
        console.info("catch");
        setIsLoading(false);
      })
    }
  };

  const imageSource = imageUriLocal != null ? { uri: imageUriLocal } : defaultImage;

  return (
    <TouchableOpacity  {...touchableOpacityProps} onPress={pickImage}>
      <Spinner
        visible={!!isLoading}
        textContent={'Uploading...'}
        textStyle={{ color: 'white' }}
        key={isLoading ? 'true' : 'false'}
      />
      <Image
        {...imageProps}
        source={imageSource ?? { uri: 'https://via.placeholder.com/150' }}
      />
    </TouchableOpacity>
  );
}