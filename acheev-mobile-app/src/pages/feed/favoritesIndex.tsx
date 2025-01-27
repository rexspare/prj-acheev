import { gql } from '@apollo/client';
import { StackScreenProps } from '@react-navigation/stack';
import { compact, groupBy } from 'lodash';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AppDivider } from '../../shared/components/AppDivider';
import { AppText } from '../../shared/components/AppText';
import { SafeView } from '../../shared/components/SafeView';
import { Colors } from '../../shared/Constants';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { useOnFocus } from '../../shared/Utilities';
import { FavoriteModelType, useFavoriteMutation, useFavoriteProgramFacetsQuery, useFavoriteWorkoutsQuery } from '../../types/gqlReactTypings.generated.d';
import { ProgramFacetSummary } from './components/programFacetSummary';
import { WorkoutCard } from './components/workoutCard';
import { ProgramFacetSummaryFavList } from './components/programFacetSummaryFavList';

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

gql`
  query Favorites($userId: String, $modelType: FavoriteModelType) {
    favorites(userId: $userId, modelType: $modelType) {
      id, modelType, modelId
    }
  }

  query FavoriteWorkouts($userId: String) {
    favoriteWorkouts(userId: $userId) {
      ...WorkoutFields, programFacet { id, name, program { id, name }},
    }
  }

  query FavoriteProgramFacets($userId: String) {
    favoriteProgramFacets(userId: $userId) {
      ...ProgramFacetListingFields,
      program { id, name }
    }
  }

`

enum Tab {
  PROGRAM_FACETS = 'facets', WORKOUTS = 'workouts'
}
export const FavoritesIndex: React.FC<Props> = ({ route, navigation }: Props) => {
  const [tab, setTab] = React.useState<Tab>(Tab.PROGRAM_FACETS);
  const facetFavoritesQuery = useFavoriteProgramFacetsQuery();
  const workoutFavoritesQuery = useFavoriteWorkoutsQuery();
  const [favoriteMutation] = useFavoriteMutation();

  useOnFocus(navigation, () => {
    console.log("Reloading favorites");
    facetFavoritesQuery?.refetch?.();
    workoutFavoritesQuery?.refetch?.();
  });

  

  const renderedTabs = React.useMemo(() => {
    const tabs = Object.values(Tab).map((val) => {
      const isActive = val === tab;
      return (
        <TouchableOpacity key={val} onPress={() => setTab(val as Tab)}
          style={{
            borderBottomWidth: isActive ? 2 : 1, borderBottomColor: isActive ? Colors.YELLOW : '#777',
            flex: 1, paddingBottom: 10, marginTop: 10
          }}
        >
          <AppText style={{ color: isActive ? 'white' : '#777', fontSize: 16, textAlign: 'center' }}>{val === Tab.PROGRAM_FACETS ? 'Focuses' : 'Workouts'}</AppText>
        </TouchableOpacity>
      )
    });

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
        {tabs}
      </View>
    )
  }, [tab, setTab]);

  return (
    <SafeView backgroundColor={'black'} scroll={true} style={{
    }}>
      {renderedTabs}

      <View style={{ padding: 10, paddingTop: 20 }}>
        {tab === Tab.WORKOUTS &&
          Object.values(groupBy(compact(workoutFavoritesQuery.data?.favoriteWorkouts), item => item.programFacet.id)).map((workouts, index) => (
            <View key={workouts[0].programFacet.id} style={{ backgroundColor: Colors.BACKGROUND, padding: 10, borderRadius: 5, marginBottom: 15 }}>
              <AppText style={{ color: 'white', fontSize: 20 }}>{workouts[0].programFacet.program.name} - {workouts[0].programFacet.name}</AppText>
              <AppDivider style={{ marginBottom: 0 }} />
              {workouts.map((workout, index) =>
                <WorkoutCard key={workout.id} workout={workout}
                  hideBorder={index === workouts.length - 1}
                  onFavorite={(workoutId) => {
                    favoriteMutation({ variables: { modelId: `${workoutId}`, modelType: FavoriteModelType.Workout } }).then(() => {
                      workoutFavoritesQuery?.refetch?.();
                    });
                  }} />
              )}
            </View>
          ))
        }
        {tab === Tab.PROGRAM_FACETS &&
          Object.values(groupBy(compact(facetFavoritesQuery.data?.favoriteProgramFacets), item => item.program.id)).map((facetGroup) => (
            <View key={facetGroup[0].program.id} style={{ backgroundColor: Colors.BACKGROUND, padding: 10, borderRadius: 5, marginBottom: 15 }}>
              <AppText style={{ color: 'white', fontSize: 20, marginBottom: 15 }}>{facetGroup[0].program.name} </AppText>

              {facetGroup.map(facet =>
                <TouchableOpacity key={facet.id}
                  onPress={() => navigation.navigate(AppRoutes.PROGRAM_LISTING, { programId: facet.program.id, selectedFacetId: facet.id })}
                  style={{ marginBottom: 15, borderRadius: 10, borderColor: '#555', borderStyle: 'solid', borderWidth: 1 }}
                >
                  <ProgramFacetSummary
                    programFacet={facet}
                    navigation={navigation}
                    onFavorite={(facetId) => {
                      favoriteMutation({ variables: { modelId: `${facetId}`, modelType: FavoriteModelType.ProgramFacet } }).then(() => {
                        facetFavoritesQuery?.refetch?.();
                      });
                    }} />
                </TouchableOpacity>

              )}
            </View>
          ))
        }
      </View>
    </SafeView >
  );
}