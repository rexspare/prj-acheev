import React from 'react';
import { SafeView } from '../../shared/components/SafeView';
import type { StackScreenProps } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { ScheduledWorkout } from '../../types/gqlReactTypings.generated.d';
import moment from 'moment';
import { groupBy, orderBy } from 'lodash';
import { TouchableOpacity, View } from 'react-native';
import { AppText } from '../../shared/components/AppText';
import { Colors } from '../../shared/Constants';
import CheckBox from '@react-native-community/checkbox';

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

export const ProfileCalendar: React.FC<Props> = ({ route, navigation }: Props) => {

  const scheduledWorkouts: ScheduledWorkout[] = [
    {
      id: 1,
      name: 'Conditioning',
      isCompleted: true,
      date: moment().subtract(1, 'day')
    },
    {
      id: 1354,
      name: 'Conditioning',
      isCompleted: false,
      date: moment()
    },
    {
      id: 2,
      name: 'Strength',
      isCompleted: true,
      date: moment().add(4, 'day')
    },
    {
      id: 3,
      name: 'Stretching',
      isCompleted: false,
      date: moment().add(20, 'day')
    },
    {
      id: 4,
      name: 'Healing',
      isCompleted: false,
      date: moment().add(30, 'day')
    },
    {
      id: 6,
      name: 'Breathing',
      isCompleted: false,
      date: moment().add(30, 'day')
    }
  ];

  const dateGroups = React.useMemo(() => {
    return orderBy(groupBy(scheduledWorkouts, item => moment(item.date).get('dayOfYear')), item => item[0].date, 'asc')
  }, [scheduledWorkouts]);

  const workoutSections = React.useMemo(() => {
    return Object.values(dateGroups).filter(group => group.length > 0).map(items => {

      const dateMoment = moment(items[0].date);
      const isCurrentDate = moment().isSame(dateMoment, 'date');

      const workouts = items.map(item => (
        <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <CheckBox
            value={item.isCompleted}
            onValueChange={(newValue) => undefined}
            boxType='square'
            style={{ width: 15, height: 15, marginRight: 12, marginLeft: 5 }}
            tintColor={'#aaa'}
            onCheckColor={Colors.YELLOW}
            onTintColor={Colors.YELLOW}
          />
          <TouchableOpacity onPress={() => navigation.navigate(AppRoutes.WORKOUT_LISTING, { workoutId: item.id })}>
            <AppText style={{ fontSize: 16, color: 'white' }}>{item.name}</AppText>
          </TouchableOpacity>
        </View>
      ));

      return (
        <View style={{ borderTopColor: isCurrentDate ? Colors.YELLOW : '#333', paddingVertical: 15, borderTopWidth: 1 }}>
          <View style={{ paddingHorizontal: 5 }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 15 }}>
              <AppText style={{ color: isCurrentDate ? Colors.YELLOW : 'white', fontSize: 20 }}>{dateMoment.format('dddd')}</AppText>
              <AppText style={{ color: isCurrentDate ? Colors.YELLOW : 'white', fontSize: 20 }}>{dateMoment.format('D MMM')}</AppText>
            </View>
            {workouts}
          </View>
        </View>
      )
    })
  }, [dateGroups]);

  return (
    <>
      <SafeView backgroundColor={'black'} padded={true} scroll={true} style={{
        paddingTop: 10,
      }}>
        {workoutSections}
      </SafeView>
    </>
  );
}