import React from 'react';
import { Text, TextProps } from "react-native";

export interface AppTextProps extends TextProps {
  bold?: boolean;
  semiBold?: boolean;
  light?: boolean;
  fontSize?: number;
}

export function AppText(props: AppTextProps) {
  const fontFamily = React.useMemo(() => {
    if (!!props.bold) {
      return 'Aeonik-Bold';
    } else if (!!props.semiBold) {
      return 'Aeonik-Semibold';
    } else if (!!props.light) {
      return 'Aeonik-Light';
    }

    return 'Aeonik';
  }, []);

  return <Text allowFontScaling={false} {...props} style={[{ fontSize: props.fontSize }, props.style, { fontFamily }]} />;
}
