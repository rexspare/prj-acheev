import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { IDimensions } from '../../types/types';

interface IProps {
  imageStyle?: ImageStyle;
  source: ImageSourcePropType;
  widthPercent?: number;
  wrapperStyle?: ViewStyle;
}

export const AppImage: React.FC<IProps> = ({ source, imageStyle, widthPercent, wrapperStyle }: IProps) => {
  const [containerDimensions, setContainerDimensions] = React.useState<IDimensions>();
  const imageDimensions = Image.resolveAssetSource(source);

  const onLayoutParent = (event: LayoutChangeEvent) => {
    setContainerDimensions(event.nativeEvent.layout);
  }

  const renderImage = () => {
    if (containerDimensions === undefined || containerDimensions === undefined) {
      return null;
    }

    let newWidth = 0;
    if (widthPercent !== undefined) {
      newWidth = containerDimensions.width * widthPercent;
    }
    const newHeight = (newWidth / imageDimensions.width) * imageDimensions.height;

    return <Image source={source} resizeMode='contain' style={{ ...imageStyle, height: newHeight, width: newWidth }} />
  }

  return (
    <View onLayout={onLayoutParent} style={{ width: '100%', justifyContent: 'center', alignItems: 'center', ...wrapperStyle }}>
      {renderImage()}
    </View>
  );
}