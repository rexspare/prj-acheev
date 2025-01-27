import React, { ReactNode } from 'react';

import { Colors } from '../Constants';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';


interface IProps {
  text?: string;
  content?: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  absolute?: boolean;
}

export const AppBadge: React.FC<IProps> = ({ absolute, content, style, text, textStyle }: IProps) => {

  const styles = StyleSheet.create({
    badge: {
      position: absolute ? 'absolute' : undefined,
      bottom: absolute ? -5 : undefined,
      backgroundColor: Colors.RED,
      borderRadius: 9,
      paddingHorizontal: 5,
      paddingVertical: 2,

      justifyContent: 'center',
      alignItems: 'center',
      opacity: .95
    },
    badgeText: {
      color: 'white',
      fontSize: 9,
      fontWeight: 'bold'
    }
  });

  return (
    <View style={{ ...styles.badge, ...style }}  >
      {!!text ?
        <Text allowFontScaling={false} style={{ ...styles.badgeText, ...textStyle }}>
          {text}
        </Text>
        :
        content
      }
    </View>
  );
}