import { StackNavigationProp } from '@react-navigation/stack';
import { compact, groupBy, orderBy } from 'lodash';
import React from 'react';
import { Image, TouchableOpacity, View, ViewPropertiesIOS } from "react-native";
import { AppCard } from '../../../shared/components/AppCard';
import { AppText } from '../../../shared/components/AppText';
import { Colors } from '../../../shared/Constants';
import { AppRoutes, NavigatorParams } from '../../../shared/Routing';
import { FavoriteModelType, ProgramFacetListingFieldsFragment, SkillLevel, useFavoriteMutation, useWorkoutsQuery, WorkoutsQuery, } from '../../../types/gqlReactTypings.generated.d';
import { WorkoutCard } from './workoutCard';

const iconCollapse = require(`../../../assets/images/icons/collapse.png`);
const iconUncollapse = require(`../../../assets/images/icons/uncollapse.png`);

interface Props extends ViewPropertiesIOS {
  programFacet: ProgramFacetListingFieldsFragment;
  skillLevel: SkillLevel;
  size?: number
  navigation: StackNavigationProp<NavigatorParams, AppRoutes.PROGRAM_LISTING, undefined>,
  selectedFacetId?: any;
  workoutCardRef?: any;
  EnableOnPress?: boolean;
}

export function ProgramWorkoutList(props: Props) {
  const { programFacet, skillLevel, selectedFacetId, workoutCardRef = null, EnableOnPress = true } = props;
  const workoutsQuery = useWorkoutsQuery({ variables: { programFacetId: programFacet.id, skillLevel } });
  const [collapsedWeeks, setCollapsedWeeks] = React.useState<number[]>([]);
  const [favoriteMutation] = useFavoriteMutation();


  const renderWorkout = (workout: WorkoutsQuery['workouts'][0], index: number, weekData: any) => {
    return (
      <View
        ref={workout?.week == 1 && workout.order == 1 ? workoutCardRef : null}
        style={{
          width: '100%'
        }}>
        <WorkoutCard
          programWorkouts={weekData}
          selectedFacetId={selectedFacetId}
          workout={workout}
          key={workout.id}
          day={workout.order}
          onFavorite={workoutId => {
            EnableOnPress &&
              favoriteMutation({ variables: { modelId: `${workoutId}`, modelType: FavoriteModelType.Workout } }).then(() => {
                workoutsQuery?.refetch?.();
              });
          }}
          skillLevel={skillLevel}
        />
      </View>
    )
  }



  const expandedHitSplot = { top: 20, bottom: 20, left: 20, right: 20 };

  const renderWeek = (workouts: WorkoutsQuery['workouts'], weekData: any) => {
    const workout = workouts[0];
    const isCollapsed = collapsedWeeks.includes(workout.week);
    return (
      <AppCard
        key={workouts[0].week}
        style={{ backgroundColor: Colors.BACKGROUND, borderRadius: 5, padding: 15, marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <AppText style={{ color: 'white', fontSize: 20, lineHeight:22 }} semiBold>Week {workout.week}</AppText>

          {isCollapsed ?
            <TouchableOpacity onPress={() => EnableOnPress && setCollapsedWeeks(collapsedWeeks.filter(item => item !== workout.week))} hitSlop={expandedHitSplot}>
              <Image source={iconUncollapse} style={{ width: 18, height: 10 }} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => EnableOnPress && setCollapsedWeeks([...collapsedWeeks, workout.week])} hitSlop={expandedHitSplot}>
              <Image source={iconCollapse} style={{ width: 18, height: 10 }} />
            </TouchableOpacity>
          }
        </View>
        {!isCollapsed &&
          <>
            <View style={{ backgroundColor: '#ffffff7f', height: 1, marginTop: 10 }} />
            {orderBy(workouts, item => item.order, 'asc').map((item, index) => (renderWorkout(item, index, weekData)))}
          </>
        }
      </AppCard >
    )
  }

  const workouts = groupBy(compact(workoutsQuery.data?.workouts), item => item.week);
  const weeksdata = orderBy(Object.entries(workouts), item => item[0]).map(item => item[1])
  const weeks = orderBy(Object.entries(workouts), item => item[0]).map(item => renderWeek(item[1], weeksdata))

  return (
    <>
      {weeks}
    </>
  );
}
