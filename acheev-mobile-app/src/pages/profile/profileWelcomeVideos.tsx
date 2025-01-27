import React from 'react';
import { SafeView } from '../../shared/components/SafeView';
import type { StackScreenProps } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from '../../shared/components/AppText';
import { AppDivider } from '../../shared/components/AppDivider';

const imageWelcomePlaceholder = require(`../../assets/images/welcome/placeholder.png`);


interface Props extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

const WELCOME_VIDEOS = [
  { title: 'Welcome video', source: imageWelcomePlaceholder },
  { title: 'Lorem Ipsum Dolor', source: imageWelcomePlaceholder },
  { title: 'Lorem Ipsum Dolor Sir Amet Eget', source: imageWelcomePlaceholder },
]

export const ProfileWelcomeVideos: React.FC<Props> = ({ route, navigation }: Props) => {

  return (
    <>
      <SafeView backgroundColor={'black'} padded={true} scroll={true} style={{
        paddingTop: 20,
      }}>
        {WELCOME_VIDEOS.map(item => (
          <View key={item.title}>
            <AppText style={{ color: 'white', fontSize: 18, marginBottom: 20 }} semiBold>{item.title}</AppText>
            <TouchableOpacity style={{}}>
              <Image source={item.source} style={{ height: 200, width: '100%', resizeMode: 'contain' }} />
            </TouchableOpacity>
            <AppDivider style={{ marginTop: 30 }} />
          </View>
        ))}

      </SafeView>
    </>
  );
}