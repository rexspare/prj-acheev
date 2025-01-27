import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import { Colors } from './Constants';
const iconBack = require(`../assets/images/icons/back.png`);
const imageHeaderLogo = require(`../assets/images/icon_text.png`);
const iconBackWhite = require(`../assets/images/icons/back_white.png`);


export const STANDARD_BACK_WHITE_IMAGE = <Image source={iconBackWhite} style={{ width: 20, height: 16, marginLeft: 15 }} />;
export const STANDARD_BACK = () => <Image source={iconBack} style={{ width: 20, height: 16, marginLeft: 15 }} />;
export const STANDARD_BACK_WHITE = () => STANDARD_BACK_WHITE_IMAGE;


export const TRANSPARENT_HEADER = {
  title: ' ',
  headerBackImage: STANDARD_BACK_WHITE,
  headerBackTitle: ' ',
  headerShown: true,
  headerTransparent: true,
}

export const MAIN_NAV_OPTIONS: StackNavigationOptions = {
  headerShown: true,
  headerTintColor: 'white',
  headerStyle: { backgroundColor: Colors.BACKGROUND, shadowColor: 'transparent' },
  headerTitleStyle: { color: 'white' },
}

export const DEFAULT_HEADER_TITLE =
  <Image source={imageHeaderLogo} style={{ width: 150, resizeMode: 'contain', marginLeft: 15 }} />