import { gql } from '@apollo/client';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, ImageSourcePropType } from 'react-native';
import { AuthContext } from '../../shared/auth/Authentication';
import { AppButton } from '../../shared/components/AppButton';
import { AppText } from '../../shared/components/AppText';
import { SafeView } from '../../shared/components/SafeView';
import { Colors } from '../../shared/Constants';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { useOnFocus } from '../../shared/Utilities';
import { useUserQuery } from '../../types/gqlReactTypings.generated.d';
const iconCog = require(`../../assets/images/icons/cog.png`);

const iconWeight = require(`../../assets/images/icons/account_weight.png`);
const iconWorkoutStats = require(`../../assets/images/icons/account_workout_stats.png`);
const iconCalendar = require(`../../assets/images/icons/account_calendar.png`);
const iconFAQs = require(`../../assets/images/icons/account_faqs.png`);
const iconVideos = require(`../../assets/images/icons/account_videos.png`);
const iconSubscription = require(`../../assets/images/icons/account_subscription.png`);
const iconFeedback = require(`../../assets/images/icons/account_feedback.png`);
const iconRate = require(`../../assets/images/icons/account_rate.png`);
const iconShare = require(`../../assets/images/icons/account_share.png`);
const iconPersonalize = require(`../../assets/images/icons/account_personalize.png`);


interface Props extends StackScreenProps<NavigatorParams, AppRoutes.PROFILE> {
}

gql`
  query User($userId: String!) {
    user(userId: $userId) {
      id, fullName, imageUrl, location,  
    }
  }

`

export const ProfileIndex: React.FC<Props> = ({ route, navigation }: Props) => {
  const { currentUser, signOut } = React.useContext(AuthContext);
  const userId = route.params?.userId ?? currentUser?.id;
  const { data, refetch } = useUserQuery({ variables: { userId }, skip: userId === undefined });
  const [tab, setTab] = React.useState<'collection' | 'wishlist' | 'tasted'>('collection');

  useOnFocus(navigation, () => {
    console.log("Reloading profile");
    refetch?.();
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'My Account',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate(AppRoutes.PROFILE_SETTINGS)}>
          <Image source={iconCog} style={{ width: 28, height: 28, marginRight: 10, resizeMode: 'contain' }} />
        </TouchableOpacity>
      ),

    });
  }, [navigation, data?.user]);

  const renderAction = React.useCallback((title: string, icon: ImageSourcePropType, onPress?: () => void) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ flexDirection: 'row', paddingVertical: 15, alignItems: 'center' }}
      >
        <Image source={icon} style={{ height: 25, width: 25, marginRight: 20 }} />
        <AppText style={{ color: 'white', fontSize: 16 }}>{title}</AppText>
      </TouchableOpacity>
    )
  }, []);

  if (data == null) {
    return <AppText>Loading...</AppText>
  }

  const { fullName, imageUrl, location } = data.user;

  return (
    <SafeView backgroundColor={'black'} scroll={true} padded={false} style={{
    }}>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
        <View style={{ height: 100, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 100, borderColor: 'white', borderWidth: 1 }} />
        </View>
        <AppText bold fontSize={25} style={{ marginTop: 15, color: 'white' }}>{fullName}</AppText>

        <AppButton theme='yellow'
          textProps={{ style: { fontSize: 16 } }}
          style={{ minWidth: 220, marginTop: 25, }} onPress={() => navigation.navigate(AppRoutes.PROFILE_SETTINGS)}>Edit Profile</AppButton>
      </View>

      <ScrollView style={{ marginTop: 30 }} >
        <View style={{ backgroundColor: Colors.BACKGROUND, padding: 20, paddingHorizontal: 30 }}>
          <AppText style={{ fontSize: 20, color: 'white', marginBottom: 10 }} semiBold>Account</AppText>
          {renderAction('Personalize', iconPersonalize, () => navigation.navigate(AppRoutes.PROFILE_PERSONALIZE))}
          {/* {renderAction('My Calendar', iconCalendar, () => navigation.navigate(AppRoutes.PROFILE_CALENDAR))} */}
          {/* {renderAction('Workout Stats', iconWorkoutStats, () => navigation.navigate(AppRoutes.PROFILE_WORKOUT_STATS))} */}
          {/* {renderAction('Weight Stats', iconWeight, () => navigation.navigate(AppRoutes.PROFILE_WEIGHT_STATS))} */}
          {/* {renderAction('Welcome Video', iconVideos, () => navigation.navigate(AppRoutes.PROFILE_WELCOME_VIDEOS))} */}
          {/* {renderAction('My Subscription', iconSubscription, () => navigation.navigate(AppRoutes.PROFILE_SUBSCRIPTION))} */}
        </View>

        <View style={{ backgroundColor: Colors.BACKGROUND, padding: 20, paddingHorizontal: 30, marginTop: 30 }}>
          <AppText style={{ fontSize: 20, color: 'white', marginBottom: 10 }} semiBold>Others</AppText>
          {renderAction('FAQs', iconFAQs, () => navigation.navigate(AppRoutes.PROFILE_FAQ))}
          {renderAction('Feedback', iconFeedback, () => navigation.navigate(AppRoutes.PROFILE_FEEDBACK))}
          {/* {renderAction('Rate App', iconRate, () => undefined)}
          {renderAction('Share App', iconShare, () => undefined)} */}
        </View>

        <AppButton
          onPress={signOut}
          theme='yellow' style={{ marginTop: 30, marginBottom: 30, marginHorizontal: 75 }}>Logout</AppButton>
      </ScrollView >

    </SafeView >
  );
}