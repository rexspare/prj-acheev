import React from 'react';
import { View, Button, Text } from 'react-native';
import { Colors } from '../../../shared/Constants';

interface IProps {
  onBack?: () => void;
  title?: string;
}

export const OnboardingHeader: React.FC<IProps> = ({ onBack, title, }: IProps) => {

  return (
    <View style={{ alignItems: 'flex-start', width: '100%', justifyContent: 'center' }}>
      {onBack != null &&
        <Button
          title="Back"
          color={Colors.MAROON}
          onPress={onBack}
        />
      }
      {title != null &&
        <Text allowFontScaling={false} style={{ position: 'absolute', alignSelf: 'center', fontSize: 17, fontWeight: '600' }}>
          {title}
        </Text>
      }
    </View>
  );
}