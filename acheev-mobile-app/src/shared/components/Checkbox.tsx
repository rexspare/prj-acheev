import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Colors } from '../Constants';

interface IProps {
  checked?: boolean;
  toggle: () => void;
}

export const Checkbox: React.FC<IProps> = ({ checked, toggle }: IProps) => {
  return (
    <TouchableOpacity style={{ padding: 3.5, borderColor: Colors.GRAY_TEXT, width: 22, height: 22, borderWidth: 1, borderRadius: 22, marginVertical: 5, }} onPress={toggle}>
      {!!checked &&
        <View style={{ width: '100%', height: '100%', backgroundColor: Colors.MAROON, borderRadius: 22 }} />
      }

    </TouchableOpacity>
  );
}