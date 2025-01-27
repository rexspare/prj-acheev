import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, Image, View, ViewProps } from "react-native";
import { AppText } from '../../../shared/components/AppText';
import { Colors } from '../../../shared/Constants';
import { AppRoutes, NavigatorParams } from '../../../shared/Routing';
import { CompletionModelType, ProgramFacetListingFieldsFragment, SkillLevel, useCompletionsQuery, useProgramFacetQuery, useWorkoutsQuery } from '../../../types/gqlReactTypings.generated.d';
import moment from 'moment';
import { compact, first, groupBy, last, orderBy } from 'lodash';
import { AuthContext } from '../../../shared/auth/Authentication';
import { InprogressEvent } from '../../../hooks/useInprogressEventsApi';

const iconCalendar = require(`../../../assets/images/icons/calendar.png`);
const iconWorkout = require(`../../../assets/images/icons/workout_new.png`);
const iconDay = require(`../../../assets/images/icons/day.png`);
const iconLastDate = require(`../../../assets/images/icons/last_date.png`);

interface Props extends ViewProps {
  // programFacet: Pick<ProgramFacetListingFieldsFragment, 'id' | 'imageUrl' | 'name' | 'program'>;
  programFacet: any;
  navigation: StackNavigationProp<NavigatorParams, AppRoutes.BASE | AppRoutes.PROGRAM_INFO | AppRoutes.PROGRAM_LISTING, undefined>;
}

export function InProgressSummary(props: Props,) {
  const { programFacet } = props;
  const programFacetListingQuery = useProgramFacetQuery({ variables: { programFacetId: programFacet.id } });
  const { currentUser } = React.useContext(AuthContext);
  const [skillLevel, setSkillLevel] = React.useState<SkillLevel | undefined>(currentUser?.skillLevel);

  React.useEffect(() => {
    if (skillLevel == null) {
      setSkillLevel(currentUser?.skillLevel);
    }
  }, [currentUser?.skillLevel]);

  const workoutsQuery = useWorkoutsQuery({ variables: { programFacetId: programFacet.id, skillLevel: skillLevel == null ? SkillLevel.Intermediate : skillLevel }, skip: skillLevel == null });


  const workouts = orderBy(compact(workoutsQuery.data?.workouts), ['week', 'order'], ['asc', 'asc']);

  const completionsQuery = useCompletionsQuery({ variables: { modelType: CompletionModelType.Workout, parentModelId: programFacet.id, parentModelType: CompletionModelType.ProgramFacet } });

  const { nextWorkout, lastWorkoutDate } = React.useMemo(() => {
    try {
      const completions = orderBy(compact(completionsQuery.data?.completions), 'createdAt', 'desc');
      if (completions == null) {
        return { lastWorkout: null, nextWorkout: null };
      }

      const lastIndex = workouts.findIndex(item => item.id === first(completions)?.modelId);
      if (lastIndex === -1) {
        return { lastWorkout: null, nextWorkout: last(workouts) };
      }

      // console.info({
      //   lastIndex,
      //   workouts: workouts.length
      // })

      return { lastWorkout: workouts[lastIndex], lastWorkoutDate: first(completions)?.completedAt, nextWorkout: workouts[lastIndex + 1] }
    } catch (e) {
      console.error(e);
      return { lastWorkout: null, nextWorkout: null }
    }
  }, [completionsQuery.data, workouts]);

  const nextWorkoutText = nextWorkout != null ? nextWorkout.name : 'N/A';
  const currentWeek = nextWorkout?.week;
  const currentDay = nextWorkout != null ? workouts.filter(item => item.week === nextWorkout?.week).findIndex(item => item.id === nextWorkout?.id) + 1 : undefined;
  const lastWorkoutText = lastWorkoutDate != null ? moment(programFacet.workout?.completedAt).format('DD MMMM yyyy') : undefined;


  // UPDATED WORK FOR NEXTWORK FROM FIRESTORE

  // EMD


  const renderStatItem = React.useCallback((title: string, icon: any, value: React.ReactNode) => {
    return (
      <View style={{ alignItems: 'center', flexDirection: 'column', maxWidth: '100%', paddingHorizontal: 10, flex: 1, paddingBottom: 10 }}>
        <Image source={icon} style={{ width: 25, height: 25 }} resizeMode='contain' />
        <AppText style={{ fontSize: 12, color: 'white', textAlign: 'center', marginTop: 10 }}>{title}</AppText>
        <AppText semiBold style={{ fontSize: 15, color: Colors.YELLOW, textAlign: 'center', marginTop: 10 }} numberOfLines={1} ellipsizeMode="tail">{value}</AppText>
      </View>
    )
  }, []);

  return (
    <View style={{ width: '100%', flexDirection: 'row', borderRadius: 10, overflow: 'hidden', marginTop: 15, marginBottom: 10 }}>
      <View style={{ flex: 1, padding: 15 }}>
        <Image source={{ uri: programFacet.imageUrl }} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, opacity: .3 }} />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          {/* <AppText style={{ color: 'white', fontSize: 22 }} numberOfLines={1}>{programFacet.program.name} - {programFacet.name}</AppText> */}
          <AppText style={{ color: 'white', fontSize: 22, fontWeight: '700', textAlign: 'center' }} >{programFacet.name} - <AppText style={{ fontSize: 18 }}>{programFacet?.skillLevel}</AppText></AppText>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 30 }}>
          {/* {renderStatItem(`Workout`, iconWorkout, nextWorkoutText)} */}
          {renderStatItem(`Workout`, iconWorkout, programFacet?.nextWorkout?.name)}
          {/* {renderStatItem('Week', iconCalendar, currentWeek)} */}
          {renderStatItem('Week', iconCalendar, programFacet?.nextWorkout?.metadata?.week || "N/A")}
          {/* {renderStatItem('Day', iconDay, currentDay)} */}
          {renderStatItem('Day', iconDay, programFacet.nextWorkout?.metadata?.order || "N?A")}
          {/* {renderStatItem('Last Date', iconLastDate, lastWorkoutText)} */}
          {renderStatItem('Last Date', iconLastDate, moment.unix(programFacet?.workout?.completedAt).format('DD MMMM yyyy'))}
        </View>

      </View>
    </View>
  );
}
