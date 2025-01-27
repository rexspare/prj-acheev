import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { AppText } from '../../../shared/components/AppText';
import { AppView } from '../../../shared/components/AppView';
import { Colors } from '../../../shared/Constants';
import { AppRoutes, NavigatorParams } from '../../../shared/Routing';
import { ProgramListFieldsFragment } from '../../../types/gqlReactTypings.generated.d';
import { ProgramCard } from './programCard';

const iconPlus = require(`../../../assets/images/icons/plus.png`);


interface Props {
  programList: ProgramListFieldsFragment;
  navigation: StackNavigationProp<NavigatorParams, AppRoutes.BASE, undefined>;
  programRef?: any;
  programViewAllRef?: any;
  EnableOnPress?: boolean;
}

export function FeedProgramList({
  programList: unfilteredProgramList,
  navigation,
  programRef = null,
  programViewAllRef = null,
  EnableOnPress = true
}: Props) {

  const programList = React.useMemo(() => {
    return {
      ...unfilteredProgramList,
      programs: unfilteredProgramList.programs.filter(item => !!item.live && !item.archived)
    }
  }, [unfilteredProgramList]);


  const showViewAll = programList.programs.length > 2;
  return (
    <AppView background padded style={{ marginTop: 12, marginBottom: 3 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <AppText style={{ color: 'white', fontSize: 20 }} semiBold>{programList.name == "Sports Programs" ? "Sport Programs" : programList.name}</AppText>
        {showViewAll &&
          <TouchableOpacity ref={programViewAllRef} style={{ borderBottomWidth: 1, borderBottomColor: Colors.YELLOW, }} onPress={() => navigation.navigate(AppRoutes.PROGRAMS_ALL, { programList })}>
            <AppText style={{ color: Colors.YELLOW, paddingVertical: 2 }}>View All</AppText>
          </TouchableOpacity>
        }
      </View>
      <View
        style={{
          backgroundColor: '#ffffff7f',
          height: 1,
          marginTop: 10,
          marginRight: -20
        }} />

      <ScrollView ref={programRef} horizontal={true} style={{ marginTop: 15, }}>

        {programList.programs.map(program =>
          <ProgramCard
            EnableOnPress={EnableOnPress}
            program={program}
            key={program.id} 
            secondary={true}
            size={150}
            />
        )}
        {showViewAll &&
          <TouchableOpacity
            onPress={() => EnableOnPress && navigation.navigate(AppRoutes.PROGRAMS_ALL, { programList })}
            style={{ marginRight: 20, alignItems: 'center' }}>
            <View style={{ padding: 35, borderWidth: 4, borderColor: Colors.YELLOW, flexGrow: 0, flexShrink: 1, borderRadius: 150, }}>
              <Image source={iconPlus} style={{ width: 70, height: 70, borderRadius: 70, }} />
            </View>
            <AppText style={{ fontSize: 20, color: 'white', marginTop: 10 }}>View All</AppText>
          </TouchableOpacity>
        }
      </ScrollView>
    </AppView>
  );
}
