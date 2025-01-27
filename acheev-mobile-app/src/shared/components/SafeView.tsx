import React, { ReactNode } from 'react';

import { Colors } from '../Constants';
import { ImageSourcePropType, KeyboardAvoidingView, SafeAreaView, ViewStyle, Image, ScrollView } from 'react-native';
import { AppScroll } from './AppScroll';
import { STANDARD_PADDING } from '../GlobalStyles';
import { isIos } from '../Utilities';

interface IProps {
  backgroundColor?: string;
  children?: React.ReactNode | React.ReactNode[];
  darkBackground?: boolean;
  header?: ReactNode;
  padded?: boolean;
  paddingAmount?: number;
  scroll?: boolean;
  scrollBackgroundColor?: string;
  statusBackground?: boolean;
  style?: ViewStyle;
  persistTaps?: ScrollView['props']['keyboardShouldPersistTaps'];
  bgColor?: string;
  bgSource?: ImageSourcePropType;
}

export const SafeView: React.FC<IProps> = ({ paddingAmount, backgroundColor, children, darkBackground, scrollBackgroundColor, header, padded, scroll, statusBackground, style, persistTaps, bgSource }: IProps) => {


  const bgColor = darkBackground ?
    Colors.RED
    : Colors.RED;

  return (
    <>
      {bgSource != null &&
        <Image source={bgSource} style={{ width: '100%', height: '100%', position: 'absolute', }} />
      }
      <SafeAreaView style={{
        backgroundColor: backgroundColor ?? (statusBackground ? bgColor : undefined),
        display: 'flex',
        height: '100%',
        flex: 1
      }}>


        {header}

        <KeyboardAvoidingView
          behavior={isIos() ? "padding" : undefined}
          style={{
            ...style,
            backgroundColor,
            flex: 1,
            flexDirection: 'column',
            padding: padded ? (paddingAmount ?? STANDARD_PADDING) : undefined
          }}
        >
          {scroll === true ?
            <AppScroll persistTaps={persistTaps} scrollBackgroundColor={scrollBackgroundColor}>
              {children}
            </AppScroll>
            :
            children
          }
        </KeyboardAvoidingView>
      </SafeAreaView >
    </>
  );
}