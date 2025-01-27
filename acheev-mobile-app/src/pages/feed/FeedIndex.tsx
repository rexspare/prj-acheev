import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackScreenProps } from '@react-navigation/stack';
import { AVPlaybackStatus, Audio, Video, ResizeMode } from 'expo-av';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import useCompletedWorkoutApi from '../../hooks/useCompletedWorkoutApi';
import useInprogressEventsApi, { InprogressEvent } from '../../hooks/useInprogressEventsApi';
import { AuthContext } from '../../shared/auth/Authentication';
import { AppInput, InputType } from '../../shared/components/AppInput';
import { AppText } from '../../shared/components/AppText';
import { AppView } from '../../shared/components/AppView';
import { SafeView } from '../../shared/components/SafeView';
import { Colors } from '../../shared/Constants';
import { COUNTRIES } from '../../shared/data/countries.data';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { isSimulator, useOnFocus } from '../../shared/Utilities';
import { inProgressEventsStateSelectors, useInProgressEventsState } from '../../states/inProgressEvents';
import { CurrentUserFieldsFragment, useGetExerciseHistoryQuery, useProgramListsQuery } from '../../types/gqlReactTypings.generated.d';
import { FeedProgramList } from './components/feedProgramList';
import { InProgressSummary } from './components/inProgressSummary';
import { ProgramCard } from './components/programCard';
import { ProgramSearch } from './components/programSearch';
import HighlightTooltip from 'react-native-highlight-tooltip';
import { getItem, setItem } from '../../services/asyncStorage';
import VideoRN, { VideoRef } from 'react-native-video';

const iconNotifications = require(`../../assets/images/icons/notifications.png`);
const imageWelcomePlaceholder = require(`../../assets/images/welcome/placeholder.png`);
const videoWelcome = require(`../../assets/images/welcome/welcome_video.mp4`);


const HIDDEN_FACETS_KEY = 'hidden_facets3';

interface IProps extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

export const FeedIndex: React.FC<IProps> = ({ navigation, route }: IProps) => {
  const { currentUser, } = React.useContext(AuthContext);
  const [country, setCountry] = React.useState<string>();
  const [pickerDate, setPickerDate] = React.useState<Date>();
  const [showWelcomeVideos, setShowWelcomeVideos] = React.useState<boolean>(true);
  const programLists = useProgramListsQuery();
  const screenWidth = Dimensions.get('screen').width;
  const carouselRef = useRef(null);
  const { getInProgressEventsApi, removeInProgressEventsApi } = useInprogressEventsApi()
  const { getCompletedWorkoutsApi } = useCompletedWorkoutApi()
  const [isloading, setisloading] = useState(false)
  const exerciseHistoryList = useGetExerciseHistoryQuery()

  const [hiddenFacets, setHiddenFacets] = React.useState<number[]>([])
  const inprogressEvents = useInProgressEventsState(inProgressEventsStateSelectors.inProgressEvents)

  // console.log("exerciseHistoryList ==>>", exerciseHistoryList?.data?.exerciseSetHistory);

  // WALKTHROUGH
  const [tooltipText, setTooltipText] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [highlightRef, setHighlightRef] = useState(null);
  const [highlightVisible, setHighlightVisible] = useState(false);

  const [walkthroughStep, setwalkthroughStep] = useState("search")

  // reference of components which you wanna highlight

  const searchRef = useRef(null);
  const welcomeRef = useRef(null);
  const programRef = useRef(null);
  const programViewAllRef = useRef(null);

  const handleAppWalkthrough = (reference: any, tipText: any, tipPosition: any) => {
    setHighlightRef(reference);
    setTooltipText(tipText);
    setTooltipPosition(tipPosition);
  };

  const handleWalkthroughSteps = () => {
    if (walkthroughStep === 'search') {
      handleAppWalkthrough({
        reference: welcomeRef,
        style: {
          margin: 10,
        },
      }, `Hide welcome videos from home screen.`, 'topLeft');
      setwalkthroughStep('welcome');
    } else if (walkthroughStep === 'welcome') {
      handleAppWalkthrough(
        {
          reference: programViewAllRef,
          style: {
            margin: 10,
          },
        },
        'Tap to view more activities.',
        'topLeft',
      );
      setwalkthroughStep('program');
    } else if (walkthroughStep === 'program') {
      handleAppWalkthrough(
        programRef,
        'Scroll horizontally to view more activities.',
        'top',
      );
      setwalkthroughStep('programViewAll');
    } else if (walkthroughStep === 'programViewAll') {
      setTimeout(async () => {
        setHighlightVisible(false);
        setwalkthroughStep("Done")
        await setItem("@WALKTHROUGH_FIRST_STEP", true)
      }, 100);
    }
  }

  useEffect(() => {
    initWalkthrough()
  }, []);

  const initWalkthrough = async () => {
    try {
      const res = await getItem("@WALKTHROUGH_FIRST_STEP", null)
      if (res == null) {
        if (highlightVisible === false) {
          setTimeout(() => {
            setHighlightVisible(true);
            handleAppWalkthrough(searchRef, `Search by interest, activity and program.`, 'bottom');
          }, 2000);
        }
      } else {
        setwalkthroughStep("Done")
      }
    } catch (error) {

    }
  }

  // END
  React.useEffect(() => {
    AsyncStorage.getItem(HIDDEN_FACETS_KEY).then((vals) => {
      if (vals != null) {
        try {
          setHiddenFacets(JSON.parse(vals));
        } catch (err) {
          console.error('Failed to parse hidden facets', err);
        }
      }
    }).catch(console.error);
  }, []);

  useOnFocus(navigation, () => {
    console.log("Reloading social feed");
  });

  // Show walkthrough if user is new
  React.useEffect(() => {
    if (currentUser != null && moment(currentUser.createdAt).add(7, 'seconds').isAfter(moment()) || true) {
      if (2 + 2 == 4) {
        return;
      }
      setTimeout(() =>
        navigation.navigate(AppRoutes.WALKTHROUGH), 250);
    }

  }, [currentUser?.id])

  useEffect(() => {
    setisloading(true)
    getInProgressEventsApi(currentUser as CurrentUserFieldsFragment)
      .then((data: any) => {
        setisloading(false)
      })
      .catch((error) => {
        setisloading(false)
        console.log("getInProgressEventsApi Error =>>", error);
      })

    getCompletedWorkoutsApi(currentUser as CurrentUserFieldsFragment)
      .then((data: any) => { })
      .catch((error) => {
        console.log("getCompletedWorkoutsApi Error =>>", error);
      })

  }, [])



  const handleDelete = (facet: any) => {
    const newArray: number[] = [...hiddenFacets, facet.id];
    setHiddenFacets(newArray);
    AsyncStorage.setItem(HIDDEN_FACETS_KEY, JSON.stringify(newArray));
    removeInProgressEventsApi(currentUser, facet)
  }


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={undefined}>
          <Image source={iconNotifications} style={{ height: '80%', width: 50, resizeMode: 'contain' }} />
        </TouchableOpacity>
      ),

    });
  }, [navigation]);

  React.useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  }, []);

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

  // PAUSE VIDEO WHEN NAVIGATING
  React.useEffect(() => {
    const subscribe = navigation.addListener('blur', () => {
      videoRef.current?.pauseAsync()
    })

    return subscribe
  }, [navigation])

  const shortenSkillLevel = (level: string) => {
    switch (level) {
      case
        "BEGINNER":
        return "BN"

      default:
        return String(level)?.slice(0, 2)
    }
  }

  const EnableOnPress = walkthroughStep === 'Done'




  return (
    <>
      <SafeView backgroundColor='black'>
        <ScrollView style={{ paddingTop: 0 }}>
          <AppView background padded style={{ marginTop: 8 }}>

            <View
              ref={searchRef}
              style={{
                // borderWidth: 2,
                // borderColor: "#FFFFFF",
                width: '100%'
              }}>
              <ProgramSearch onPress={() => EnableOnPress && navigation.navigate(AppRoutes.PROGRAM_SEARCH)} />
            </View>

            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 15 }}>
              <AppText style={{ color: 'white', fontSize: 20 }} semiBold >Welcome Video</AppText>
              <TouchableOpacity ref={welcomeRef} onPress={() => EnableOnPress && setShowWelcomeVideos(!showWelcomeVideos)}>
                <AppText semiBold style={{ color: Colors.YELLOW }}>{showWelcomeVideos ? 'Hide' : 'Show'}</AppText>
              </TouchableOpacity>
            </View>

            {showWelcomeVideos && <ScrollView horizontal={true} style={{ paddingTop: 15, }}>
              <Video
                ref={videoRef}
                source={videoWelcome}
                useNativeControls={true}
                style={{ width: screenWidth - 20, height: 200 }}
                onPlaybackStatusUpdate={setVideoStatus}
              />
              {/* <VideoRN
                style={{ width: screenWidth - 20, height: 200 }}
                source={videoWelcome}
                resizeMode={ResizeMode.COVER}
                repeat={true}
                controls={true}
              /> */}
            </ScrollView>}
          </AppView>

          {
            highlightVisible == false &&
            <>
              {
                isloading ?
                  <ActivityIndicator color={"#FFFFFF"} size={'large'} style={{ marginVertical: 20 }} />
                  :
                  <>
                    {inprogressEvents.length > 0 &&
                      <AppView background padded style={{ marginTop: 12, marginBottom: 3 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <AppText style={{ color: 'white', fontSize: 20 }} semiBold>In Progress</AppText>
                        </View>
                        <View style={{ backgroundColor: '#ffffff7f', height: 1, marginTop: 10, marginRight: -20 }} />


                        <Carousel
                          ref={carouselRef}
                          data={inprogressEvents}
                          renderItem={({ item }: any) => {
                            return (
                              <TouchableOpacity style={{
                              }}
                                onPress={() => EnableOnPress && navigation.navigate(AppRoutes.PROGRAM_LISTING, { programId: item.program.id, selectedFacetId: item.id, skillLevel: item.skillLevel })}
                              >
                                <InProgressSummary programFacet={item} navigation={navigation} />
                              </TouchableOpacity>
                            );
                          }}
                          sliderWidth={Dimensions.get('screen').width * 0.9}
                          itemWidth={Dimensions.get('screen').width * 0.9}
                        />

                        <ScrollView horizontal={true} style={{ marginTop: 15 }}>
                          {inprogressEvents.map((facet: InprogressEvent) => (
                            <View key={`${facet.id}`} style={{ marginRight: 20 }}>
                              <ProgramCard
                                key={`${facet.id}`}
                                program={facet as any}
                                style={{ alignItems: 'center' }}
                                title={`${facet.program.name} - ${shortenSkillLevel(facet?.skillLevel as string)}`}
                                subtitle={facet.name}
                                // onPress={() => navigation.navigate(AppRoutes.PROGRAM_LISTING, { programId: facet.program.id, selectedFacetId: facet.id })}
                                onPress={() => {
                                  EnableOnPress &&
                                    navigation.navigate(AppRoutes.WORKOUT_LISTING, {
                                      workoutId: facet?.nextWorkout?.id as number,
                                      selectedFacetId: facet.id,
                                      skillLevel: facet?.skillLevel
                                    })
                                }}
                              />
                              <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity
                                  onPress={() => {
                                    EnableOnPress &&
                                      handleDelete(facet)
                                  }}

                                  style={{ borderBottomWidth: 1, borderBottomColor: 'red', borderStyle: 'solid', display: 'flex' }}>
                                  <AppText style={{ color: 'red', paddingTop: 5 }}>Remove</AppText>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ))}
                        </ScrollView>
                      </AppView>
                    }
                  </>
              }
            </>
          }


          {programLists.data?.programLists.map(list =>
            <FeedProgramList
              programRef={programRef}
              programViewAllRef={programViewAllRef}
              programList={list}
              key={list.id}
              navigation={navigation}
              EnableOnPress={walkthroughStep === 'Done'}
            />
          )}


          {isSimulator() && false &&
            <>
              <AppInput type={InputType.DATE} placeholder='Date'
                value={pickerDate} onChange={setPickerDate} />

              <AppInput type={InputType.SELECT} selectPlaceholder={{ value: 'Country', label: 'Country' }}
                selectionItems={COUNTRIES.map(country => ({ label: country, value: country }))}
                value={country} onChange={setCountry} />
            </>
          }
        </ScrollView>

        <HighlightTooltip
          tooltipText={tooltipText}
          visible={highlightVisible}
          highlightRef={highlightRef}
          tooltipPosition={tooltipPosition}
          onPressHighlight={() => handleWalkthroughSteps()}
          arrowOffset={8}
          offset={8}
          customTooltip={{
            style: {
              height: 80,
              width: 200,
              paddingHorizontal: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 10,
            },
            textStyle: {
              color: '#000000',
              fontSize: 16,
            },
            message: tooltipText,
          }}
          closeOnBackgroundInteraction={true}
          closeOnContentInteraction={false}
        />
      </SafeView >
    </>
  );
}


