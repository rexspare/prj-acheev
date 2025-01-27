import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

interface IProps extends ViewProps {
  children?: React.ReactNode | React.ReactNode[]
}

export const AppCard: React.FC<IProps> = ({ children, style }: IProps) => {
  return (
    <View style={StyleSheet.flatten([{ backgroundColor: 'white', borderRadius: 20, padding: 10 }, style])}>
      {children}
    </View >
  );
}




