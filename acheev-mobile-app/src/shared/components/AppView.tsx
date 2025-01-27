import React from 'react';
import { View, ViewProps } from "react-native";
import { Colors } from '../Constants';

export interface AppViewProps extends ViewProps {
  paddedHorizontal?: boolean;
  paddedVertical?: boolean;
  padded?: boolean;
  background?: boolean;
}

export function AppView(props: AppViewProps) {
  const { background, paddedHorizontal, paddedVertical, padded } = props;

  return <View {...props} style={[{
    paddingHorizontal: paddedHorizontal ? 15 : undefined,
    paddingVertical: paddedVertical ? 15 : undefined,
    padding: padded ? 15 : undefined,
    backgroundColor: background ? Colors.BACKGROUND : undefined
  }, props.style,]} />;
}
