import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from "react-native";
import { AppText } from '../../../shared/components/AppText';
import { Colors } from '../../../shared/Constants';
import { AppRoutes, NavigatorParams } from '../../../shared/Routing';
import { Program } from '../../../types/gqlReactTypings.generated.d';
import FastImage from 'react-native-fast-image'


interface Props extends TouchableOpacityProps {
  program: Pick<Program, 'id' | 'imageUrl' | 'name'>;
  size?: number;
  onPress?: () => void;
  /** Defaults to program name */
  title?: string;
  subtitle?: string;
  EnableOnPress?: boolean;
  secondary?: boolean;
  mainStyles?: ViewStyle;
}

export function ProgramCard(props: Props) {
  const {
    program,
    size = 120,
    onPress,
    title,
    subtitle,
    EnableOnPress = true,
    secondary = false,
    mainStyles = {}
  } = props;
  const navigation = useNavigation<NavigationProp<NavigatorParams>>();

  return (
    <TouchableOpacity
      onPress={() => EnableOnPress && (onPress ?? navigation.navigate(AppRoutes.PROGRAM_LISTING, { programId: program.id }))}
      style={[{ marginRight: 20, alignItems: 'center' }, mainStyles]} key={program.id}
      {...props}>
      {
        secondary ?
          <>
            <View style={{
              padding: Math.round(size / 20),
              borderWidth: 3,
              borderColor: Colors.YELLOW,
              flexGrow: 0,
              flexShrink: 1,
              borderRadius: Math.round(size / 12),
            }}>
              <FastImage
                source={{ uri: program.imageUrl, priority: FastImage.priority.high }}
                style={{
                  width: size,
                  height: size,
                  borderRadius: Math.round(size / 16),
                  borderWidth: 0,
                  borderColor: Colors.YELLOW + '7f',
                }} />
            </View>
            <AppText style={{ fontSize: Math.round(size / 7), color: 'white', marginTop: 10 }}>{title ?? program.name}</AppText>
            {subtitle != null &&
              <AppText style={{ fontSize: Math.round(size / 9), color: 'white', marginTop: 5 }}>{subtitle}</AppText>
            }
          </>
          :
          <>
            <View style={{ padding: Math.round(size / 12), borderWidth: Math.round(size / 30), borderColor: Colors.YELLOW, flexGrow: 0, flexShrink: 1, borderRadius: 150, }}>
              <FastImage source={{ uri: program.imageUrl, priority: FastImage.priority.high }} style={{ width: size, height: size, borderRadius: size, borderWidth: 1, borderColor: Colors.YELLOW + '7f', }} />
            </View>
            <AppText style={{ fontSize: Math.round(size / 6), color: 'white', marginTop: 10 }}>{title ?? program.name}</AppText>
            {subtitle != null &&
              <AppText style={{ fontSize: Math.round(size / 8), color: 'white', marginTop: 5 }}>{subtitle}</AppText>
            }
          </>
      }

    </TouchableOpacity >
  );
}
