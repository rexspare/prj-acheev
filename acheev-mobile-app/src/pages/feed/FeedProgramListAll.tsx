import React from 'react';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { StackScreenProps } from '@react-navigation/stack';
import { ProgramSearch } from './components/programSearch';
import { SafeView } from '../../shared/components/SafeView';
import { Dimensions, ScrollView, View } from 'react-native';
import { AppView } from '../../shared/components/AppView';
import { Colors } from '../../shared/Constants';
import { ProgramCard } from './components/programCard';

const profile1Image = require('../../assets/images/onboarding/profile1.png');

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.PROGRAMS_ALL> {
}
const { width, height } = Dimensions.get('window')

export const FeedProgramListAll: React.FC<Props> = ({ navigation, route }: Props) => {
  const { programList } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: programList.name ?? "test",
    });
  }, [navigation]);

  return (
    <SafeView backgroundColor='black'>
      <ScrollView style={{ paddingTop: 0 }}>

        <AppView background padded style={{ marginTop: 8 }}>
          <ProgramSearch />
        </AppView>

        <View style={{
          backgroundColor: Colors.BACKGROUND,
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          minHeight: '100%',
        }}>
          {programList.programs.map(program =>
            <View style={{
              marginBottom: 20,
            }}
              key={program.id}>
              <ProgramCard
                program={program}
                key={program.id}
                secondary={true}
                size={width * 0.365}
                mainStyles={{ marginRight: 0 }}
              />
            </View>
          )}
        </View>
      </ScrollView>

    </SafeView>
  )
}