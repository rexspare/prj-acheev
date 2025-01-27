import React from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { TextStyle, ViewStyle } from 'react-native';

export enum IconType {
  FONT_AWESOME,
  IONICONS
}

interface IProps {
  color: string;
  iconName: string;
  size: number;
  style?: TextStyle | ViewStyle;
  wrapperStyle?: TextStyle;
  type?: IconType;
}
export const AppIcon: React.FC<IProps> = ({ color, iconName, size, style, type, wrapperStyle }: IProps) => {

  return (
    type === IconType.IONICONS ?
      <Ionicons name={iconName} size={size} color={color} type={type ?? 'font-awesome'} iconStyle={style} style={wrapperStyle} />
      :
      <FontAwesome name={iconName} size={size} color={color} type={type ?? 'font-awesome'} iconStyle={style} style={wrapperStyle} />
  );
}