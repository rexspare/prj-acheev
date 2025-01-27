import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Colors } from './Constants';
import { StackNavigationOptions } from '@react-navigation/stack';
const imageHeaderLogo = require('../assets/images/header-logo.png');

export const STANDARD_PADDING = 15;

export const DEFAULT_TITLE = <Image source={imageHeaderLogo} style={{ height: '80%', width: 110, resizeMode: 'contain' }} />;

export const PURPLE_HEADER_SCREEN_OPTIONS: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.RED,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  headerTitle: '',
  headerTintColor: 'white',
};

export const globalStyles = StyleSheet.create({
  modalWrapper: {
    alignItems: 'center',
    backgroundColor: "#00000044",
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  modalContent: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 15,
    paddingTop: 25,
    width: '100%'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
  },
  hr: {
    backgroundColor: '#dddddd',
    height: 1,
    marginVertical: 5,
    marginHorizontal: 5
  },
  sectionHeader: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 5
  },
  lineupHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  splitHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  splitVertical: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  smallText: {
    fontWeight: '600',
    fontSize: 11,
    color: "#B1B1B1"
  }
});