import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, ImageSourcePropType } from 'react-native';
import { SafeView } from '../../../shared/components/SafeView';
import { Children } from '../../../types/types';
import { Colors } from '../../../shared/Constants';
import { StackScreenProps } from '@react-navigation/stack';
import { OnboardingRoutesParams } from '../OnboardingNavigator';

interface IProps extends StackScreenProps<OnboardingRoutesParams> {
  children?: Children;
  header?: 'login' | 'signup';
  onBack?: () => void;
  onSkip?: () => void;
  scroll?: boolean;
  title?: string;
  backgroundImage?: ImageSourcePropType;
}
export const OnboardingStyles = StyleSheet.create({
  image: {
    marginTop: 0,
    width: '60%',
    maxHeight: '15%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 20
  },
  baseButton: {
    backgroundColor: Colors.ORANGE,
    color: 'white',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20
  },
});

export const OnboardingWrapper: React.FC<IProps> = ({ children, onBack, onSkip, scroll, title, backgroundImage }: IProps) => {

  const content = (
    <>
      <SafeView backgroundColor={'transparent'} padded statusBackground scroll={scroll} persistTaps='handled' style={{ paddingTop: 40 }}>
        <View style={{ position: 'absolute', width: '100%', top: 0, flexDirection: 'row', justifyContent: 'space-between', }}>
          {onBack ?
            <TouchableOpacity onPress={onBack}>
              <Text allowFontScaling={false} style={{ color: 'white', fontSize: 16 }}>{'back'}</Text>
            </TouchableOpacity>
            :
            <View />
          }
          {onSkip ?
            <TouchableOpacity onPress={onSkip}>
              <Text allowFontScaling={false} style={{ color: Colors.SEA_FOAM, fontSize: 16 }}>{'continue'}</Text>
            </TouchableOpacity>
            :
            <View />
          }
        </View>
        <View style={{ marginBottom: 30 }}></View>
        {title !== undefined && <Text allowFontScaling={false} style={OnboardingStyles.title}>{title}</Text>}
        {children}
      </SafeView>
    </>
  )

  return (

    !!backgroundImage ?
      <ImageBackground source={backgroundImage} style={{ flex: 1, }} resizeMode={'cover'}>
        {content}
      </ImageBackground>
      :
      content

  );
}