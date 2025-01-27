import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, TouchableOpacity, View, ViewProps } from "react-native";
import { AppText } from '../../../shared/components/AppText';
import { Colors } from '../../../shared/Constants';
import { AppRoutes, NavigatorParams } from '../../../shared/Routing';
import { ProgramFacetListingFieldsFragment, SkillLevel, useProgramFacetStatsQuery } from '../../../types/gqlReactTypings.generated.d';
import { FavoriteButton } from './favoriteButton';

const iconInfo = require(`../../../assets/images/icons/info.png`);
const iconShare = require(`../../../assets/images/icons/share.png`);
const iconTarget = require(`../../../assets/images/icons/target.png`);
const iconCalendar = require(`../../../assets/images/icons/calendar.png`);
const iconWorkout = require(`../../../assets/images/icons/workout.png`);
const iconStopwatch = require(`../../../assets/images/icons/stopwatch.png`);

interface Props extends ViewProps {
  programFacet: ProgramFacetListingFieldsFragment;
  onFavorite: (workoutId: number) => void;
  skillLevel?: SkillLevel;
  size?: number
  navigation: StackNavigationProp<NavigatorParams, AppRoutes.BASE | AppRoutes.PROGRAM_INFO | AppRoutes.PROGRAM_LISTING, undefined>;
}

export function ProgramFacetSummaryFavList(props: Props,) {
  const { programFacet, onFavorite, skillLevel, navigation } = props;
  const statsQuery = useProgramFacetStatsQuery({ variables: { programFacetId: programFacet.id, skillLevel: skillLevel ?? SkillLevel.Beginner } })

  const stats = React.useMemo(() => {
    return statsQuery.data?.programFacetStats;
  }, [statsQuery.data]);

  const renderStatItem = React.useCallback((title: string, icon: any, value: React.ReactNode) => {
    return (
      <View style={{ alignItems: 'center', flexDirection: 'column', maxWidth: '100%', paddingHorizontal: 10 }}>
        <Image source={icon} style={{ width: 25, height: 25 }} resizeMode='contain' />
        <AppText style={{ fontSize: 12, color: 'white', textAlign: 'center', marginTop: 10 }}>{title}</AppText>
        <AppText semiBold style={{ fontSize: 20, color: Colors.YELLOW, textAlign: 'center', marginTop: 5 }}>{value}</AppText>

      </View>
    )
  }, []);

  return (
    <View style={{ width: '100%', flexDirection: 'row', borderRadius: 10, overflow: 'hidden' }}>
      <View style={{ flex: 1, padding: 15 }}>
        <Image source={{ uri: programFacet.imageUrl }} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, opacity: .3 }} />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={iconTarget} style={{ width: 25, height: 25, marginRight: 10 }} />
          <AppText style={{ color: 'white', fontSize: 22 }}>{programFacet.name}</AppText>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 30 }}>
          {renderStatItem(`Total\nWeeks`, iconCalendar, stats?.weekCount)}
          {renderStatItem('Total\nWorkouts', iconWorkout, stats?.workoutCount)}
          {renderStatItem('Workout\nLength', iconStopwatch, <>{stats?.workoutLength}{`\n`}<AppText style={{ fontSize: 14 }}>(mins)</AppText></>)}
        </View>

      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20, backgroundColor: '#241F21', flexDirection: 'column', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => skillLevel != null ? navigation.navigate(AppRoutes.PROGRAM_INFO, { facetId: programFacet.id, skillLevel, programId: programFacet.program.id }) : undefined}>
          <Image source={iconInfo} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>

        <FavoriteButton
          onPress={() => onFavorite(programFacet.id)}
          value={programFacet.isFavorited}
          width={28}
          height={25}
        />

        <TouchableOpacity onPress={() => navigation.navigate(AppRoutes.PROGRAM_RATING, { programId: programFacet.program.id })} >
          <Image source={iconShare} style={{ width: 29, height: 25 }} />
        </TouchableOpacity>
      </View>

    </View>
  );
}
