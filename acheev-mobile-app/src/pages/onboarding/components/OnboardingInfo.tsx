import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image, ImageSourcePropType, ImageStyle } from 'react-native';
import { ContinuationButton } from '../../../shared/components/ContinuationButton';
import { OnboardingHeader } from './OnboardingHeader';


interface IProps {
  onBack: () => void;
  onNext: () => void;
  title: string;
  description: string;
  cta?: string;
  source: ImageSourcePropType;
  imageStyle?: ImageStyle;
}
export const OnboardingInfo: React.FC<IProps> = ({ onNext, onBack, title, description, cta, source, imageStyle }: IProps) => {
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({ title })
    return () => {
      navigation.setOptions({ title: undefined })

    }
  });

  return (
    <View style={{ alignItems: 'center', flexDirection: 'column', width: '100%' }}>
      <OnboardingHeader onBack={onBack} />

      <Text allowFontScaling={false} style={{ fontSize: 24, fontWeight: '600', textAlign: 'center', maxWidth: 300, marginBottom: 35 }}>
        {title}
      </Text>

      <Text allowFontScaling={false} style={{ fontSize: 16, textAlign: 'center', marginBottom: 20, maxWidth: 300 }}>
        {description}
      </Text>
      {cta != null &&
        <Text allowFontScaling={false} style={{ fontSize: 16, textAlign: 'center', fontWeight: '600', marginBottom: 20, maxWidth: 310 }}>
          {cta}
        </Text>
      }

      <Image source={source} style={{ marginTop: 30, marginBottom: 30, maxWidth: '100%', ...(imageStyle ?? {}) }} resizeMode='contain' />

      <ContinuationButton title="Next" onPress={onNext} style={{ width: '100%', marginTop: 50 }} />
    </View>
  );
}