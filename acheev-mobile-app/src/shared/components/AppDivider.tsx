import React from 'react';
import { View, ViewProps } from 'react-native';

interface Props extends ViewProps {

}

export const AppDivider: React.FC<Props> = ({ children, style }: Props) => {
  return (
    <View style={[{ backgroundColor: '#ffffff7f', height: 1, marginTop: 10, marginRight: -20, marginBottom: 20 }, style]} />
  );
}




