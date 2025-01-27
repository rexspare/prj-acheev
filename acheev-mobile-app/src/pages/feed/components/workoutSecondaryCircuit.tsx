import { compact, first, orderBy, sumBy } from 'lodash';
import React, { useRef } from 'react';
import { Image, TouchableOpacity, View, ViewProps, StyleSheet, Dimensions, Modal, Platform } from "react-native";
import { AppCard } from '../../../shared/components/AppCard';
import { AppText } from '../../../shared/components/AppText';
import { Colors } from '../../../shared/Constants';
import { CircuitFieldsFragment, CompletionModelType, OrderByDirection, useCompleteMutation, useCompletionsQuery, useWeightStatsQuery, } from '../../../types/gqlReactTypings.generated.d';
import { minuteSecondsString, shortDurationHumanizer, filterWorkoutExerciseSets } from '../../../shared/Utilities';
import { Video, AVPlaybackStatus, ResizeMode, Audio } from 'expo-av';
import { WorkoutAddModifySet } from './workoutAddModifySet';
import { WorkoutCircuitInlineSetEditor } from './workoutCircuitInlineSetEditor';
import CardsSwipe from '../../../vendor/card-swipe';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Carousel from 'react-native-snap-carousel';
import WorkoutSwipeCardAndroid from './workoutSwipeCardAndroid';

const iconCollapse = require(`../../../assets/images/icons/collapse.png`);
const iconPlay = require(`../../../assets/images/icons/play.png`);
const iconUncollapse = require(`../../../assets/images/icons/uncollapse.png`);
const iconPlusCircle = require(`../../../assets/images/icons/plus_circle.png`);
const closeCircle = require(`../../../assets/images/icons/close.png`);
const repeatSet = require(`../../../assets/images/icons/repeat.png`);
const cross = require(`../../../assets/images/icons/cross.png`);

const vid1 = "https://acheev-public.s3.us-west-1.amazonaws.com/videos/lateral_bound_n_stick.mp4";
const vid2 = "https://acheev-public.s3.us-west-1.amazonaws.com/videos/lateral_push_to_base.mp4";
const VIDS = [vid1, vid2];

const DEFAULT_VIDEO_HEIGHT = 300;

interface Props extends ViewProps {
  circuit: CircuitFieldsFragment;
  isExpanded: boolean;
  setIsExpanded: (circuitId: number | undefined) => void;
  reloadSets?: () => void;
  index?: number;
  showHideRef?: any;
  setRestRef?: any;
  videoScrollRef?: any;
  descRef?: any;
  logSetWeightRef?: any;
  addModifySetRef?: any;
}

const HIT_SLOP = { left: 20, right: 20, bottom: 20, top: 20 }
export function WorkoutSecondaryCircuit(props: Props) {
  const carouselRef = useRef(null);
  const {
    circuit,
    isExpanded,
    setIsExpanded,
    reloadSets,
    index = 0,
    showHideRef = null,
    setRestRef = null,
    videoScrollRef = null,
    descRef = null,
    logSetWeightRef = null,
    addModifySetRef = null
  } = props;
  const orderedExercises = React.useMemo(() => orderBy(circuit.exercises, item => item.order, 'asc'), [circuit.exercises]);
  const [exerciseId, setExerciseId] = React.useState<number | undefined>(first(orderedExercises)?.id)
  const [expandDescription, setExpandDescription] = React.useState<boolean>();
  const videos = React.useRef<{ [key: string]: Video }>({});
  const [status, setStatus] = React.useState<AVPlaybackStatus>();
  const [completeMutation] = useCompleteMutation();
  const exerciseCompletionsQuery = useCompletionsQuery({ variables: { modelType: CompletionModelType.ExerciseSet, parentModelType: CompletionModelType.Exercise, parentModelId: exerciseId }, skip: exerciseId == null });
  const [showModifyLog, setShowModifyLog] = React.useState<boolean>(false);
  const [videoHeights, setVideoHeights] = React.useState<{ [videoId: string]: number }>({});
  const weightQuery = useWeightStatsQuery({ variables: { pagination: { orderBy: [{ column: 'date', direction: OrderByDirection.Desc, }], limit: 1 } } });
  const [isModalVisible, setisModalVisible] = React.useState(false)
  const [selectedExerciseReps, setselectedExerciseReps] = React.useState<any>(null)
  const [currentVideoIndex, setcurrentVideoIndex] = React.useState<number>(0);

  const userWeight = React.useMemo(() => {
    return first(compact(weightQuery.data?.weightStats))?.weight;
  }, [weightQuery]);


  const exerciseCompletions = React.useMemo(() => compact(exerciseCompletionsQuery.data?.completions), [exerciseCompletionsQuery.data?.completions]);


  const onComplete = React.useCallback((modelId: number, parentModelId: number) => {
    completeMutation({ variables: { completionInput: { modelId, modelType: CompletionModelType.ExerciseSet, parentModelId, parentModelType: CompletionModelType.Exercise } } }).then(() => {
      exerciseCompletionsQuery?.refetch?.();
    }).catch(console.error);
  }, [exerciseCompletionsQuery, completeMutation]);

  React.useEffect(() => {
    if (isExpanded == true) {
      if (exerciseId == null) {
        return;
      }
      Audio.setAudioModeAsync({ playsInSilentModeIOS: true }).then(() => {
        videos.current?.[exerciseId]?.playFromPositionAsync(0);
      })

      return () => {
        Audio.setAudioModeAsync({ playsInSilentModeIOS: true }).then(() => {
          Object.values(videos).forEach(val => val?.current?.stopAsync());
        })
      }
    }
  }, [isExpanded]);

  const exercise = React.useMemo(() => {
    return circuit.exercises.find(item => item.id === exerciseId);
  }, [exerciseId, circuit.exercises]);

  const filteredExerciseSets = React.useMemo(() => {
    return filterWorkoutExerciseSets(exercise);
  }, [exercise]);

  const shouldRender = React.useCallback((referenceExerciseId: number) => {
    const currIndex = orderedExercises.findIndex(item => item.id === exerciseId);
    const refIndex = orderedExercises.findIndex(item => item.id === referenceExerciseId);

    if ((currIndex === -1 || refIndex === -1) && exerciseId != first(orderedExercises)?.id) {
      return false;
    }

    // console.info('indices', currIndex, refIndex);

    return Math.abs(currIndex - refIndex) <= 1 || (orderedExercises.length - 1 === currIndex && refIndex === 0);
  }, [orderedExercises.map(item => item.id), exerciseId])


  const formatExerciseSets = (exerciseSets: any[]) => {
    const result = [];

    // Group sets by repCount
    let currentSet = 1;

    for (let i = 0; i < exerciseSets.length; i++) {
      const current = exerciseSets[i];
      const next = exerciseSets[i + 1];

      if (next && current.repCount === next.repCount) {
        currentSet++;
      } else {
        result.push(`${current.repCount}`);
        currentSet = 1; // Reset for next group
      }
    }

    return result;
  }


  const renderedSets = React.useMemo(() => {
    return orderBy(filteredExerciseSets, item => item.order, 'asc').map((set, index) => {
      const isCompleted = exerciseCompletions.some(item => item.modelId === set.id);
      return (
        <View
          key={index}
          style={{
            borderBottomColor: '#484848',
            borderBottomWidth: (index >= filteredExerciseSets.length - 1 ? 0 : 1),
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => {
              videos.current?.[set.exerciseId]?.playFromPositionAsync(0);
              onComplete(set.id, set.exerciseId);
            }
            }>
              <Image source={iconPlay} style={{ height: 17, width: 17, marginRight: 20 }} resizeMode='contain' />
            </TouchableOpacity>
            <AppText style={{ color: 'white' }}>Set {index + 1}</AppText>
          </View>
          <View ref={setRestRef} style={{ flexDirection: 'row' }}>
            <WorkoutCircuitInlineSetEditor
              key={set.id}
              set={set}
              isCompleted={isCompleted}
              reloadSets={reloadSets}
              userWeight={userWeight}
            />
          </View>
        </View>
      )
    })
  }, [filteredExerciseSets, exerciseCompletions]);

  React.useEffect(() => {
    setTimeout(() => {
      if (exercise == null) {
        return;
      }
      videos.current?.[exercise.id]?.playFromPositionAsync(0)
    }, 1000);
  }, []);

  const renderCard = React.useCallback((localExerciseId: number) => {
    const localExercise = orderedExercises.find(item => item.id === localExerciseId);
    if (localExercise == null) {
      return null;
    }

    return (
      <View style={styles.card} key={localExercise.id}>
        <View style={{ padding: 20, flexDirection: 'row' }}>
          <View style={{ borderColor: Colors.YELLOW, borderWidth: 1, borderStyle: 'solid', height: 30, width: 30, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
            <AppText style={{ color: Colors.YELLOW, fontSize: 16 }}>{orderedExercises.indexOf(localExercise) + 1}</AppText>
          </View>
          <View>
            <AppText style={{ color: 'white', fontSize: 16 }}>{localExercise.name}</AppText>
            <AppText style={{ color: '#ffffffaa' }}>{minuteSecondsString(sumBy(localExercise.exerciseSets, item => item.durationSeconds))} </AppText>
          </View>
        </View>
        <Video
          key={localExercise.id}
          ref={val => {
            if (val != null) {
              videos.current[localExercise.id] = val;
            }
          }}
          style={{ width: '100%', height: videoHeights[localExercise.id] ?? DEFAULT_VIDEO_HEIGHT }}
          source={shouldRender(localExercise.id) ? {
            uri:
              localExercise.videoUrl.replace(/ /g, '%20')
          } : undefined}
          useNativeControls
          onReadyForDisplay={({ naturalSize: { width, height } }) => {
            setVideoHeights({
              ...videoHeights,
              [localExercise.id]: Math.min((Dimensions.get('screen').width - 40) / width * height, 400)
            })
          }}
          resizeMode={ResizeMode.COVER}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>
    )
  }, [orderedExercises, circuit.id, shouldRender]);


  const renderCardAndroid = ({ item, index }: any) => {
    return (
      <View
        key={index}
        style={{
          height: '100%'
        }}>
        <WorkoutSwipeCardAndroid
          index={index}
          currentIndex={currentVideoIndex}
          localExerciseId={item.id}
          orderedExercises={orderedExercises}
        />
      </View>
    );
  };


  const swiper = React.useMemo(() => {
    // console.info("swiper");
    if (exercise == null) {
      return null;
    }

    // console.info(Object.values(videoHeights));


    return (
      <>
        <View
          ref={index == 0 ? videoScrollRef : null}
          style={{ height: 100 + (videoHeights[exercise.id] ?? DEFAULT_VIDEO_HEIGHT), width: '100%', marginTop: 20 }}>

          {
            Platform.OS == 'ios' &&
            <>
              {orderedExercises.length > 0 &&
                <View style={{ paddingHorizontal: 10 }}>
                  <View style={{ width: '100%', backgroundColor: '#474747', height: 23, marginBottom: -15, borderTopLeftRadius: 15, borderTopRightRadius: 15, }} />
                </View>
              }
            </>
          }
          {
            Platform.OS == 'ios' ?
              <CardsSwipe
                horizontalThreshold={Dimensions.get('screen').width * .5}
                cards={orderedExercises}
                cardContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
                onSwiped={(index) => {
                  console.info("onswiped", index);
                }}
                onSwipedRight={(index) => {
                  console.info("swipeRight", index);
                  Object.values(videos).forEach(val => val?.current?.pauseAsync());
                  const nextIndex = index === 0 ? orderedExercises.length - 1 : index - 1;
                  console.info(`Index change ${index} -> ${nextIndex}`);
                  const nextExercise = orderedExercises[nextIndex];
                  setExerciseId(nextExercise.id)
                  setTimeout(() => videos.current?.[nextExercise.id]?.playFromPositionAsync(0), 500);
                }}
                onSwipedLeft={(index) => {
                  console.info("swipeLeft", index);
                  Object.values(videos).forEach(val => val?.current?.pauseAsync());
                  const nextIndex = index === orderedExercises.length - 1 ? 0 : index + 1;
                  console.info(`Index change ${index} -> ${nextIndex}`);
                  const nextExercise = orderedExercises[nextIndex];
                  setExerciseId(nextExercise.id)
                  setTimeout(() => videos.current?.[nextExercise.id]?.playFromPositionAsync(0), 500);
                }}
                renderCard={item => renderCard(item.id)}
              />
              :
              <Carousel
                ref={carouselRef}
                data={orderedExercises}
                layout="stack"
                renderItem={renderCardAndroid}
                sliderWidth={Dimensions.get('screen').width * 0.78}
                itemWidth={Dimensions.get('screen').width * 0.72}
                onSnapToItem={(index) => {
                  setcurrentVideoIndex(index)
                  setExerciseId(orderedExercises[index]?.id)
                }}
                layoutCardOffset={7}
              // loop
              />
          }



          {/* <View style={{
            borderColor: "#FFFFFF",
            width: Dimensions.get('screen').width * 0.87,
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Carousel
              ref={carouselRef}
              layout="stack"
              data={orderedExercises}
              renderItem={({ item }: any) => {
                return (
                  renderCard(item.id)
                );
              }}
              loop={true}
              layoutCardOffset={Dimensions.get('screen').width * 0.03}
              sliderWidth={Dimensions.get('screen').width * 0.87}
              itemWidth={Dimensions.get('screen').width * 0.8}
              onSnapToItem={(index) => {
                // if (index === orderedExercises.length - 1) {
                //   // Delay the snap to first item to avoid flickering
                //   setTimeout(() => {
                //      carouselRef.current.snapToItem(0, false);
                //   }, 300); // Adjust the delay time as needed
                // }
              }}
            />
          </View> */}


        </View>
        <TouchableOpacity
          ref={index == 0 ? descRef : null}
          onPress={() => exercise.description.length > 95 && setExpandDescription(!expandDescription)}>
          <AppText style={{ color: 'white', fontSize: 16, marginTop: 10, textAlign: 'left' }}>{exercise.description.slice(0, expandDescription ? exercise.description.length : 95)}{!expandDescription && exercise.description.length > 95 ? '…' : ''}</AppText>
          {exercise.description.length > 95 &&
            <AppText style={{ color: Colors.YELLOW, textAlign: 'center', marginTop: 5 }} onPress={() => setExpandDescription(!expandDescription)}>{expandDescription ? 'Close' : 'Read More'}</AppText>
          }
        </TouchableOpacity>

        <View

          style={{
            width: '100%'
          }}>
          {renderedSets}
        </View>

        <TouchableOpacity
          ref={index == 0 ? addModifySetRef : null}
          onPress={() => setShowModifyLog(true)}
          style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          <AppText style={{ color: Colors.YELLOW, fontSize: 18, marginRight: 10 }}>Add & Modify Sets</AppText>
          <Image source={iconPlusCircle} style={{ width: 22, height: 22 }} />
        </TouchableOpacity>
      </>
    )
  }, [Object.values(videoHeights).sort().join(','), orderedExercises, isExpanded, exercise, expandDescription, setExpandDescription, setShowModifyLog, videos]);

  return (
    <View
      key={circuit.id}
      style={styles.main}
    >
      {/* TOP HEADING */}
      <View style={[styles.row1]}>
        <View style={[styles.row, {
          borderColor: "#FFFFFF",
          flexShrink: 1,
          justifyContent: 'flex-start'
        }]}>
          <View style={[styles.circle, { borderColor: "#FFFFFF" }]}>
            <AppText style={{ color: "#FFFFFF", fontSize: 14 }}>{index + 1}</AppText>
          </View>

          <AppText style={{
            color: "#FFFFFF",
            fontSize: 20,
            flexShrink: 1,
          }} semiBold>
            {circuit.name} </AppText>
          {/* {`(${sumBy(orderedExercises, (ex: any) => sumBy(ex.exerciseSets, (item: any) => item.repCount))})`} */}


        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 7
          }}>
            <Image source={repeatSet} style={{ width: 15, height: 15, tintColor: "#FFFFFF" }} />
            <AppText style={{
              color: "#FFFFFF",
              fontSize: 20,
              marginLeft: 7
            }} semiBold>
              {exercise?.exerciseSets.filter(item => !item.archived).length}</AppText>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.circle}
            onPress={() => setisModalVisible(true)}
          >
            <Image source={iconPlay} style={{ height: 10, width: 10, tintColor: Colors.YELLOW }} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      </View>

      {/* WORKOUTS */}
      <View style={{ marginTop: 7 }}>
        {
          orderedExercises.map((ex: any, ind: number) => {
            return (
              <View key={ind}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setselectedExerciseReps(ex.id == selectedExerciseReps ? null : ex.id)}
                  style={[styles.row, { paddingLeft: 35, marginTop: 8 }]}>
                  <View style={[styles.rowSpaceBetween, {
                    flex: 1,
                    flexShrink: 1
                  }]}>
                    {/* <AppText style={styles.exerciseDuration} >{sumBy(ex.exerciseSets, (item: any) => item.repCount)} </AppText> */}
                    <AppText style={styles.exerciseDuration} >{formatExerciseSets(ex.exerciseSets)[0]} </AppText>
                    {/* <Image source={repeatSet} style={{ width: 10, height: 10, marginRight: 10, tintColor: "#FFFFFF" }} /> */}

                    <AppText style={styles.exerciseTitle}>{ex.name}</AppText>
                  </View>
                  <Image source={selectedExerciseReps == ex.id ? iconCollapse : iconUncollapse} style={{ width: 10, height: 10, marginRight: 10 }} />
                </TouchableOpacity>


                <Collapsible collapsed={!(selectedExerciseReps == ex.id)}>
                  <View style={{
                    marginVertical: 8
                  }}>
                    {
                      ex.exerciseSets.map((item: any, index: number) => {
                        const useReps = item.repCount != null && item.repCount > 0;
                        const useDistance = item?.repsAvailable  // ON ADMIN FRONT END "use Distance" uses this field "repsAvailable"
                        const bodyWeight = item?.weightRelative  // ON ADMIN FRONT END "Body Weight" uses this field "weightRelative"
                        const useMaxPerc = item?.maxPercAvailable

                        return (
                          <View style={[styles.rowSpaceBetween, { marginTop: 8 }]}>
                            <View style={[styles.circleSmall]}>
                              <AppText style={{ color: "#FFFFFF", fontSize: 12 }}>{index + 1}</AppText>
                            </View>
                            <AppText
                              key={index}
                              style={styles.exerciseSetTxt}>{`${useReps ? "Reps:" : "Time:"} ${useReps ? item.repCount ?? 0 : item.duration ?? 0}  ${useDistance ? "Distance:" : bodyWeight ? "BW:" : "Weight:"} ${useDistance ? item.distance ?? 0 : item.weight ?? 0}  ${useMaxPerc ? `%Max: ${item.percentageMax ?? '0'}` : ""}`}</AppText>
                          </View>
                        )
                      })
                    }
                  </View>
                </Collapsible>

              </View>
            )
          })
        }
      </View>

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setisModalVisible(false)}
        transparent
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          {/* <View style={{
            width: '90%',
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginBottom: 10
          }}>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setisModalVisible(false)}
              style={{
                backgroundColor: "#FFFFFF",
                padding: 5,
                borderRadius: 50
              }}>
              <Image source={cross} style={{
                width: 30,
                height: 30
              }} />
            </TouchableOpacity>

          </View> */}
          <AppCard
            key={circuit.id}
            style={{
              backgroundColor: Colors.BACKGROUND,
              borderWidth: 1,
              borderColor: '#797979',
              borderRadius: 5,
              padding: 15,
              height: Dimensions.get('screen').height * 0.8,
              width: '90%',
            }}>
            <KeyboardAwareScrollView
              style={{ paddingTop: 10, paddingHorizontal: 10 }}
            >

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    ref={index == 0 ? showHideRef : null}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }} onPress={() => setisModalVisible(false)} hitSlop={HIT_SLOP}>
                    <Image source={closeCircle} style={{ width: 25, height: 25, marginRight: 10, tintColor: "#FFFFFF" }} />

                    <AppText style={{ color: 'white', fontSize: 20 }} semiBold> {circuit.name}</AppText>
                  </TouchableOpacity>

                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText style={{ color: 'white', opacity: .8, marginTop: 5 }}>{circuit.exercises.length} exercise circuit</AppText>

                {exercise != null &&
                  <>
                    <TouchableOpacity
                      onPress={() => setShowModifyLog(true)}>
                      <AppText style={{ color: Colors.YELLOW, opacity: .8, marginTop: 5 }}>{exercise.exerciseSets.filter(item => !item.archived).length} sets | {shortDurationHumanizer(exercise.restDurationSeconds * 1000).replace(' secs', 's').replace(' mins', 'm')} rest</AppText>
                    </TouchableOpacity>
                  </>}
              </View>
              <View style={{
                width: '100%',
              }}>
                {swiper}
              </View>

              {exercise != null && showModifyLog &&
                <WorkoutAddModifySet
                  key={exercise.id}
                  modalProps={{ show: showModifyLog, onCancel: () => setShowModifyLog(false) }}
                  circuit={circuit}
                  exercise={exercise}
                  exerciseCompletions={exerciseCompletions}
                  exerciseSets={filteredExerciseSets}
                  reloadSets={reloadSets}
                  onComplete={onComplete}
                />
              }

              <View style={{ marginBottom: 50 }}></View>
            </KeyboardAwareScrollView>
          </AppCard >
        </View>

      </Modal>


    </View >
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '92%',
    height: '70%',
  },
  card: {
    width: '100%',
    height: '100%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
    backgroundColor: '#2E2E2E',
    borderColor: Colors.YELLOW,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 18,
    overflow: 'hidden'
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },

  main: {
    // borderWidth: 2,
    borderColor: "#FFFFFF",
    width: '100%',
    marginVertical: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  circle: {
    borderColor: Colors.YELLOW,
    borderWidth: 1,
    borderStyle: 'solid',
    height: 28,
    width: 28,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
  exerciseTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
    flexShrink: 1
  },
  exerciseSets: {
    color: Colors.YELLOW,
    fontSize: 13,
    textDecorationLine: 'underline',
    marginLeft: 10
  },
  exerciseSetTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  exerciseDuration: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Aeonik-Semibold',
    width: 50
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  circleSmall: {
    borderColor: Colors.YELLOW,
    borderWidth: 1,
    borderStyle: 'solid',
    height: 20,
    width: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '15%'
  },
});