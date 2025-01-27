import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, View, ViewStyle } from 'react-native';

interface IProps {
  imageStyle?: ImageStyle;
  source: ImageSourcePropType;
  height: number;
  wrapperStyle?: ViewStyle;
}

export const AppHeightImage: React.FC<IProps> = ({ source, imageStyle, height, wrapperStyle }: IProps) => {
  const imageDimensions = Image.resolveAssetSource(source);
  const heightMultiplier = height / imageDimensions.height;
  const newWidth = heightMultiplier * imageDimensions.width;

  return (
    <View style={{ ...wrapperStyle }}>
      <Image source={source} resizeMode='contain' style={{ ...imageStyle, height: height, width: newWidth }} />
    </View >
  );
}