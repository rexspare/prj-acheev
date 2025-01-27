import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { globalStyles } from '../GlobalStyles';
import { Colors } from '../Constants';
import { AuthContext } from '../auth/Authentication';
import { useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const imageLogo = require('../../assets/images/logo.png');


const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
    paddingHorizontal: 15,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});


interface IProps {
  title: string;
  hideUser?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
  hideToggle?: boolean;
  showLogo?: boolean;
  namePrefix?: string;
  hideBorder?: boolean;
  rightAction?: { title: React.ReactNode; onPress: () => void };
}

export const PageHeader: React.FC<IProps> = ({ hideBorder, namePrefix, title, hideUser, wrapperStyle, hideToggle, showLogo, rightAction }: IProps) => {
  const { currentUser } = React.useContext(AuthContext);
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={wrapperStyle}>
      {showLogo &&
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Image source={imageLogo} style={{ height: 55, width: 55, alignItems: 'center', marginBottom: 10 }} />
        </View>
      }
      <View style={[{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }]}>

        {hideToggle ? <View />
          :
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={() => navigation.toggleDrawer()}
            style={{ position: 'absolute', alignSelf: 'flex-start', marginLeft: 20 }}>
            {/* <Image source={imageBg} style={{ height: 21, width: 24 }} /> */}
          </TouchableOpacity>
        }
        <View style={{ ...styles.wrapper }}>

          <Text allowFontScaling={false} style={{ fontWeight: '600', fontSize: 17 }}>{namePrefix}{hideUser ? title : currentUser?.fullName}</Text>
          {!hideUser && <Text allowFontScaling={false} style={{ color: Colors.RED, fontSize: 12, fontWeight: '600', marginTop: 4 }}>{title}</Text>}
        </View >

        {!rightAction ? <View />
          :
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={rightAction.onPress}
            style={{ position: 'absolute', alignSelf: 'flex-end', paddingRight: 20 }}>
            {rightAction.title}
          </TouchableOpacity>
        }

      </View>
      {!hideBorder &&
        <View style={{ ...globalStyles.hr, marginTop: 20 }} />
      }
    </View>
  );
}

