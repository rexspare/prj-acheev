import React from 'react';
import { ScrollView, View } from 'react-native';
import { STANDARD_PADDING } from '../GlobalStyles';

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
  padded?: boolean;
  persistTaps?: ScrollView['props']['keyboardShouldPersistTaps'];
  scrollBackgroundColor?: string;
}

export const AppScroll: React.FC<IProps> = ({ scrollBackgroundColor, children, padded, persistTaps }: IProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{
      paddingBottom: 10,
      backgroundColor: scrollBackgroundColor,
      ...(padded ? { padding: STANDARD_PADDING } : {})
    }}
    keyboardShouldPersistTaps={persistTaps ?? 'never'}
    >
      {children}
      <View style={{ height: 25 }} />
    </ScrollView >
  );
}