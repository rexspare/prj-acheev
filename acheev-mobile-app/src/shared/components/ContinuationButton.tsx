import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '../Constants';

interface IProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export const ContinuationButton: React.FC<IProps> = ({ disabled, style, title = 'Next', onPress }: IProps) => {

  return (
    <TouchableOpacity disabled={disabled} style={[
      {
        backgroundColor: Colors.RED, paddingVertical: 15, paddingHorizontal: 20, alignItems: 'center', borderRadius: 30, marginVertical: 15,
        opacity: !!disabled ? .3 : 1
      }, style]} onPress={onPress}>
      <Text allowFontScaling={false} style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>{title}</Text>
    </TouchableOpacity>
  );
}