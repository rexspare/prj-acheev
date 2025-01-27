import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Colors } from '../Constants';
import { AppText } from './AppText';


export const generateTabs = (title: string, active: boolean, onClick: () => void, badgeValue?: string | number) => {
  const color = !!active ? 'black' : Colors.ORANGE;
  return (
    <TouchableOpacity onPress={onClick} style={{ display: 'flex', justifyContent: 'center', flex: 1, alignItems: 'center', minHeight: 40, backgroundColor: 'white', borderBottomColor: color, borderBottomWidth: 2 }}>
      {!!badgeValue && <View style={{ borderRadius: 10, backgroundColor: Colors.ORANGE, paddingHorizontal: 10, marginBottom: 8, opacity: active ? 1.0 : .5 }}>
        <AppText style={{ color: 'white' }}>{badgeValue}</AppText>
      </View>}
      <AppText style={{ color, opacity: (!!active ? 10.0 : .6) }} bold>{title}</AppText>
    </TouchableOpacity>
  )
}

export const wrapTabs = (children: React.ReactNode | React.ReactNode[]) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      {children}
    </View>
  )
}
