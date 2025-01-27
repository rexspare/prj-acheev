import React from 'react';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeView } from '../../shared/components/SafeView';
import { ScrollView, View, Image, } from 'react-native';
import { useProgramFacetQuery, useProgramFacetStatsQuery, useProgramQuery, useWorkoutsQuery } from '../../types/gqlReactTypings.generated.d';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import ObjectHash from 'object-hash';
import { AppText } from '../../shared/components/AppText';
import { Colors } from '../../shared/Constants';
import { AVPlaybackStatus, Audio, Video } from 'expo-av';
import { AppDivider } from '../../shared/components/AppDivider';
import { AppButton } from '../../shared/components/AppButton';
import { compact, groupBy, orderBy, first } from 'lodash';

const iconCalendar = require(`../../assets/images/icons/calendar.png`);
const iconWorkout = require(`../../assets/images/icons/workout.png`);


interface Props extends StackScreenProps<NavigatorParams, AppRoutes.PROGRAM_INFO> {
}

export const ProgramInfo: React.FC<Props> = ({ navigation, route }: Props) => {
  const { programId, facetId, skillLevel } = route.params;
  const programQuery = useProgramQuery({ variables: { programId } })
  const statsQuery = useProgramFacetStatsQuery({ variables: { programFacetId: facetId, skillLevel: skillLevel } })
  const workoutsQuery = useWorkoutsQuery({ variables: { programFacetId: facetId, skillLevel } });


  const programFacetListingQuery = useProgramFacetQuery({ variables: { programFacetId: facetId } });

  const program = React.useMemo(() => {
    return programQuery.data?.program;
  }, [programQuery]);

  const currentFacet = React.useMemo(() => {
    return programFacetListingQuery.data?.programFacet
  }, [ObjectHash(programFacetListingQuery.data?.programFacet ?? {})]);

  React.useLayoutEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    navigation.setOptions({
      headerTitle: currentFacet?.name + ' Info',
    });
  }, [navigation, program]);


  const workouts = groupBy(compact(workoutsQuery.data?.workouts), item => item.week);
  const firstWorkout = first(first(orderBy(Object.entries(workouts), item => item[0]))?.[1]);

  const videoRef = React.useRef<Video>(null);
  const [videoStatus, setVideoStatus] = React.useState<AVPlaybackStatus>();
  const [playedOnce, setIsPlayedOnce] = React.useState<boolean>();

  const triggerAudio = React.useCallback(async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    videoRef.current?.playAsync();
    setIsPlayedOnce(true);
  }, [videoRef]);

  React.useEffect(() => {
    if (videoStatus?.isLoaded && videoStatus.isPlaying && !playedOnce) {
      triggerAudio();
    }
  }, [videoStatus])


  return (
    <SafeView backgroundColor='black'>
      <ScrollView style={{ paddingTop: 0, paddingHorizontal: 10 }}>
        {program == null ?
          <Spinner />
          :
          <>
            {currentFacet != null &&
              <>
                {currentFacet.videoUrl != null ?
                  <Video
                    ref={videoRef}
                    key={currentFacet.videoUrl}
                    source={{ uri: currentFacet.videoUrl }}
                    useNativeControls={true}
                    onPlaybackStatusUpdate={setVideoStatus}
                    style={{ width: '100%', height: 200 }} />
                  :
                  <Image style={{ width: '100%', height: 300 }}
                    source={{ uri: currentFacet.imageUrl }} resizeMode={'cover'} />
                }

                {/* <Image source={iconPlay} style={{ height: 30, width: 30, position: 'absolute', top: 125, left: (Dimensions.get('screen').width / 2) - 20 }} resizeMode='contain' /> */}

                <View style={{ paddingTop: 20, paddingHorizontal: 20, }}>
                  <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    flexShrink: 1,
                    flex: 1,
                  }}>
                    <View style={{
                      flex: 1,
                    }}>
                      <AppText style={{ fontSize: 24, color: Colors.YELLOW, lineHeight: 28 }}>{currentFacet.name}</AppText>
                      <AppText style={{ fontSize: 16, color: '#aaa', lineHeight: 20 }}>{skillLevel.toLowerCase()}</AppText>
                    </View>
                    <View style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingTop: 10,
                    }}>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={iconCalendar} style={{ width: 16, height: 16, marginRight: 8 }} resizeMode='contain' />
                        <AppText style={{ fontSize: 16, color: 'white' }}>{statsQuery.data?.programFacetStats.weekCount} weeks</AppText>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={iconWorkout} style={{ width: 16, height: 16, marginRight: 8 }} resizeMode='contain' />
                        <AppText style={{ fontSize: 16, color: 'white' }}>{statsQuery.data?.programFacetStats.workoutCount} workouts</AppText>
                      </View>

                    </View>
                  </View>

                  {currentFacet.description != null &&
                    <>
                      <AppText style={{ color: 'white', fontSize: 20, marginTop: 30 }} semiBold>About</AppText>
                      <AppDivider style={{ marginBottom: 10 }} />
                      <AppText style={{ color: '#eee' }}>
                        {currentFacet.description}
                      </AppText>
                    </>
                  }

                  {currentFacet.equipmentNeeded != null &&
                    <>
                      <AppText style={{ color: 'white', fontSize: 20, marginTop: 30 }} semiBold>Equipment</AppText>
                      <AppDivider style={{ marginBottom: 10 }} />
                      <AppText style={{ color: '#eee' }}>
                        {currentFacet.equipmentNeeded}
                      </AppText>
                    </>
                  }


                  {currentFacet.goals != null &&
                    <>
                      <AppText style={{ color: 'white', fontSize: 20, marginTop: 30 }} semiBold>Goals</AppText>
                      <AppDivider style={{ marginBottom: 10 }} />
                      <AppText style={{ color: '#eee' }}>
                        {currentFacet.goals}
                      </AppText>
                    </>
                  }

                  {firstWorkout != null &&
                    <AppButton theme='yellow' style={{ marginVertical: 30 }} onPress={() => navigation.navigate(AppRoutes.WORKOUT_LISTING, { workoutId: firstWorkout?.id })}>Jump In</AppButton>}
                </View>
              </>
            }
          </>
        }
      </ScrollView>
    </SafeView>
  )
}