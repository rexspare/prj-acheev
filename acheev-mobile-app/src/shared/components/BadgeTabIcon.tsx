import React from 'react';
import { Icon } from 'react-native-elements'
import { Text, View } from 'react-native';
import { Colors } from '../Constants';


interface IProps {
  badgeCount?: number;
  color: string;
  iconName: string;
  size: number;
  type?: string;
}
export const BadgeTabIcon: React.FC<IProps> = ({ badgeCount, color, iconName, size, type }: IProps) => {

  return (
    <View style={{ width: 24, height: 24, margin: 5, marginTop: 10 }}>
      <Icon name={iconName} size={size} color={color} type={type ?? 'font-awesome'} />
      {!!badgeCount && badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: 3,
            top: -17,
            backgroundColor: Colors.SEA_FOAM,
            borderRadius: 9,
            width: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ color: Colors.RED, fontSize: 12, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}