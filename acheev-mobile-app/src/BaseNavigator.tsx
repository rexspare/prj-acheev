import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { BaseRoutes, AppRoutes } from './shared/Routing';
import { OnboardingNavigator } from './pages/onboarding/OnboardingNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PushNotificationRouter } from './shared/components/PushNotificationRouter';
import { Colors } from './shared/Constants';
import { FeedNavigator } from './pages/feed/FeedNavigator';
import { Image } from 'react-native';
import { ProfileNavigator } from './pages/profile/ProfileNavigator';
import { FavoritesIndex } from './pages/feed/favoritesIndex';
import { MAIN_NAV_OPTIONS } from './shared/navigation';
import SubscriptionIndex from './pages/subscription/SubscriptionIndex';
import { CommunityNavigator } from './pages/community/communityNavigator';
import Entypo from 'react-native-vector-icons/Entypo'
import useKeyboard from './hooks/useKeyboard';

const iconTabBarHome = require('./assets/images/icons/tab_home.png');
const iconTabBarProfile = require('./assets/images/icons/tab_account.png');
const iconTabBarFavorites = require('./assets/images/icons/tab_favorites.png');


const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const renderTabBarIcon = (source: any) => ({ focused, color, size }: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  return (<Image source={source} resizeMode='contain' style={{ width: size, height: size, tintColor: color }} />)
}



const homeTabs = (_notificationCount?: number) => () => {
  const { keyboardStatus } = useKeyboard()
  return (
    <Tabs.Navigator initialRouteName={AppRoutes.FEED}
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: Colors.RED },
        tabBarActiveTintColor: '#FDDA00',
        tabBarStyle: { backgroundColor: '#241F21', borderWidth: 0, borderTopWidth: 0, display: keyboardStatus ? 'none' : 'flex' },
        tabBarInactiveTintColor: '#DDDDDD',
        ...MAIN_NAV_OPTIONS,
        headerShown: false,
      }}>

      <Tabs.Screen name={AppRoutes.FEED} component={FeedNavigator} options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => <Image source={iconTabBarHome} resizeMode='contain' style={{ width: size, height: size, tintColor: color }} />
      }} />

      <Tabs.Screen name={AppRoutes.COMMUNITY} component={CommunityNavigator} options={{
        title: 'Community',
        tabBarIcon: ({ color, size }) => <Entypo name='chat' color={color} size={size} />
      }} />

      <Tabs.Screen name={AppRoutes.FAVORITES} component={FavoritesIndex}
        options={{
          title: 'Favorites',
          tabBarIcon: renderTabBarIcon(iconTabBarFavorites),
          ...MAIN_NAV_OPTIONS,
        }} />

      <Tabs.Screen name={AppRoutes.PROFILE} component={ProfileNavigator} options={{
        title: 'My Account',
        tabBarIcon: renderTabBarIcon(iconTabBarProfile),
        ...MAIN_NAV_OPTIONS,
        headerShown: false
      }} />
    </Tabs.Navigator>

  )
};

export type ModalRoutesParams = {}

interface IProps {
  initialRouteName?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export const LoggedInNavigator: React.FC<IProps> = ({ initialRouteName }: IProps) => {
  return (
    <>
      <PushNotificationRouter />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
        <Stack.Screen name={BaseRoutes.SUBSCRIPTION} component={SubscriptionIndex} />
        <Stack.Screen name={BaseRoutes.HOME} component={homeTabs(undefined)} />
      </Stack.Navigator>
    </>
  );
}

export const LoggedOutNavigator: React.FC<IProps> = ({ initialRouteName }: IProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name={BaseRoutes.ONBOARDING} component={OnboardingNavigator} />
    </Stack.Navigator>
  );
}