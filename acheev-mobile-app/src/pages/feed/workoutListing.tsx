import React, { useEffect, useState, useRef } from 'react';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeView } from '../../shared/components/SafeView';
import { ActivityIndicator, Alert, Dimensions, StyleSheet, Switch, Text, View } from 'react-native';
import { CompletionModelType, CurrentUserFieldsFragment, useCompleteMutation, useCompletionsQuery, useProgramFacetQuery, useProgramQuery, useWorkoutQuery, useWorkoutsQuery } from '../../types/gqlReactTypings.generated.d';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { AppText } from '../../shared/components/AppText';
import { Colors } from '../../shared/Constants';
import { compact, first, sumBy, orderBy, groupBy, zip } from 'lodash';
import { isSimulator, shortDurationHumanizer, filterWorkoutExerciseSets } from '../../shared/Utilities';
import { WorkoutCircuit } from './components/workoutCircuit';
// import GestureRecognizer from 'react-native-swipe-gestures';
import { AppButton } from '../../shared/components/AppButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Slider } from '@miblanchard/react-native-slider';
import ObjectHash from 'object-hash';
import { AuthContext } from '../../shared/auth/Authentication';
import useInprogressEventsApi, { InprogressEvent } from '../../hooks/useInprogressEventsApi';
import { completedWorkoutsSelectors, useCompletedWorkoutsState } from '../../states/completedWorkout';
import { checkIfConfigIsValid } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils';
import { checkIfWorkoutCompleted, getFontSize } from '../../utils/myutil';
import useCompletedWorkoutApi from '../../hooks/useCompletedWorkoutApi';
import HighlightTooltip from 'react-native-highlight-tooltip';
import { getItem, setItem } from '../../services/asyncStorage';
import { WorkoutSecondaryCircuit } from './components/workoutSecondaryCircuit';
import QuestionaireModal from './components/questionaireModal';
import SwipeButton from 'rn-swipe-button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.WORKOUT_LISTING> {
}

const iconSwipe = require(`../../assets/images/icons/swipe.png`);
const iconSwipeSmall = require(`../../assets/images/icons/swipe_small.png`);


export const WorkoutListing: React.FC<Props> = ({ navigation, route }: Props) => {
  // const { workoutId, programWorkouts: weeksdata, selectedFacetId, skillLevel } = route.params;
  const { workoutId, selectedFacetId, skillLevel } = route.params;
  const { currentUser, } = React.useContext(AuthContext);
  const workoutQuery = useWorkoutQuery({ variables: { workoutId } })
  const [expandedCircuitId, setExpandedCircuitId] = React.useState<number>();
  const [completeMutation] = useCompleteMutation();
  const [completionValue, setCompletionValue] = React.useState<number>(0);
  const programFacetListingQuery = useProgramFacetQuery({ variables: { programFacetId: selectedFacetId ?? -1 }, skip: selectedFacetId == null })
  const { addInProgressEventsApi, removeInProgressEventsApi } = useInprogressEventsApi()
  const [isLoading, setisLoading] = React.useState<boolean>(false);
  const [secondaryView, setsecondaryView] = React.useState(false)
  const completedWorkouts = useCompletedWorkoutsState(completedWorkoutsSelectors.completedWorkouts)
  const { addCompletedWorkoutsApi } = useCompletedWorkoutApi()

  // WALKTHROUGH
  const [tooltipText, setTooltipText] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [highlightRef, setHighlightRef] = useState(null);
  const [highlightVisible, setHighlightVisible] = useState(false);

  const [walkthroughStep, setwalkthroughStep] = useState("workoutSummary")
  const [questionaireModalVisible, setquestionaireModalVisible] = useState(true)


  // reference of components which you wanna highlight

  const scrollRef = useRef(null);
  const workoutSummaryRef = useRef(null);
  const switchRef = useRef(null);
  const showHideRef = useRef(null);
  const setRestRef = useRef(null);
  const videoScrollRef = useRef(null);
  const descRef = useRef(null);
  const logSetWeightRef = useRef(null);
  const addModifySetRef = useRef(null);
  const swiperef = useRef(null);

  const flattenWorkouts = () => {
    let flatten: any = []

    programWorkouts.forEach((weeklist: any) => {
      const sorted = weeklist.sort((a: any, b: any) => a.order - b.order)
      weeklist.forEach((workout: any) => {
        flatten = [...flatten, workout]
      })
    })

    return flatten
  }

  const workoutsQuery = useWorkoutsQuery({ variables: { programFacetId: selectedFacetId, skillLevel } });
  const workouts = groupBy(compact(workoutsQuery.data?.workouts), item => item.week);
  const programWorkouts = orderBy(Object.entries(workouts), item => item[0]).map(item => item[1])
  const flatprogramWorkouts = flattenWorkouts()

  const workoutIndex = flatprogramWorkouts.findIndex((workout: any) => workout.id === workoutId);
  const nextWorkorkoutQuery = useWorkoutQuery({
    variables: {
      workoutId: workoutIndex == -1 ? -1 : workoutIndex < flatprogramWorkouts?.length - 1 ? flatprogramWorkouts[workoutIndex + 1]?.id : -1
    }
  })


  const workout = React.useMemo(() => {
    return workoutQuery.data?.workout;
  }, [workoutQuery]);


  const nextWorkout = React.useMemo(() => {
    return nextWorkorkoutQuery.data?.workout;
  }, [workoutQuery]);


  // WOLKTHROUGH
  const handleAppWalkthrough = (reference: any, tipText: any, tipPosition: any) => {
    setHighlightRef(reference);
    setTooltipText(tipText);
    setTooltipPosition(tipPosition);
  };

  const handleWalkthroughSteps = () => {
    if (walkthroughStep === 'workoutSummary') {
      handleAppWalkthrough({
        reference: showHideRef,
        style: {
          margin: 10,
        },
      }, `Drop down arrow to view circuit.`, 'bottom');
      setwalkthroughStep('showHide');
    } else if (walkthroughStep === 'showHide') {

      handleAppWalkthrough(
        switchRef,
        'Toggle between workout views',
        'bottomLeft',
      );
      setwalkthroughStep('newUi');

    } else if (walkthroughStep === 'newUi') {

      handleAppWalkthrough(
        videoScrollRef,
        'Swipe horizontally to view exercises.',
        'top',
      );
      setwalkthroughStep('videoScroll');

    } else if (walkthroughStep === 'videoScroll') {

      scrollRef.current?.scrollToPosition(0, 700, true);
      setTimeout(() => {
        handleAppWalkthrough(
          {
            reference: descRef,
            style: {
              marginBottom: 10,
            },
          },
          'See description of the exercise.',
          'top',
        );
        setwalkthroughStep('desc');
      }, 500);

    } else if (walkthroughStep === 'desc') {
      handleAppWalkthrough(
        {
          reference: setRestRef,
          style: {
            margin: 10,
          },
        },
        'Log reps and weight.',
        'topLeft',
      );
      setwalkthroughStep('setRef')
    }
    // else if (walkthroughStep === 'desc') {
    //   handleAppWalkthrough(
    //     logSetWeightRef,
    //     'Log set, reps, reps and weight',
    //     'top',
    //   );
    //   setwalkthroughStep('logSetWeight');
    // } 
    // else if (walkthroughStep === 'desc') {
    //   handleAppWalkthrough(
    //     {
    //       reference: addModifySetRef,
    //       style: {
    //         marginBottom: 10,
    //       },
    //     },
    //     'Add or adjust sets and weights',
    //     'top',
    //   );
    //   setwalkthroughStep('logSetWeight');
    // } 
    // else if (walkthroughStep === 'logSetWeight') {
    //   scrollRef.current?.scrollToEnd({ animated: true });
    //   setTimeout(() => {
    //     handleAppWalkthrough(
    //       swiperef,
    //       'Swipe to complete the workout',
    //       'top',
    //     );
    //     setwalkthroughStep('swipe');
    //   }, 1000);
    // } 
    else if (walkthroughStep === 'setRef') {
      setTimeout(async () => {
        setHighlightVisible(false);
        setwalkthroughStep('Done')
        await setItem("@WALKTHROUGH_THIRD_STEP", true)
      }, 100);
    }
  }



  useEffect(() => {
    initWalkthrough()
  }, [workout?.id]);

  const initWalkthrough = async () => {
    try {
      const res = await getItem("@WALKTHROUGH_THIRD_STEP", null)
      if (res == null) {
        if (workout != null) {
          if (highlightVisible === false) {
            setTimeout(() => {
              setHighlightVisible(true);
              handleAppWalkthrough(workoutSummaryRef, `View workout summary.`, 'bottom');
            }, 2000);
          }
        }
      } else {
        setwalkthroughStep('Done')
      }
    } catch (error) {

    }
  }

  // END



  const programQuery = useProgramQuery({ variables: { programId: workout?.programId as number } })

  const program = React.useMemo(() => {
    return programQuery.data?.program;
  }, [programQuery]);


  const currentFacet = React.useMemo(() => {
    return programFacetListingQuery.data?.programFacet
  }, [ObjectHash(programFacetListingQuery.data?.programFacet ?? {})]);

  // const allFacetsOrdered = React.useMemo(() => {
  //   return orderBy(compact(programQuery.data?.program.programFacets).filter(item => !!item.live && !item.archived), item => item.order, 'asc');
  // }, [programQuery.data?.program.programFacets]);


  React.useEffect(() => {
    setExpandedCircuitId(first(workout?.circuits)?.id);
  }, [workout?.id]);

  const toggleView = () => {
    setTimeout(() => {
      setsecondaryView(previousState => !previousState)
    }, 100);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: workout?.name,
      headerRight: () => (
        <View
          ref={switchRef}
          style={{
            // width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: 10,
          }}>
          {/* <AppText style={{ color: "#FFFFFF", marginRight: 10 }}>Secondary UI</AppText> */}
          <Switch
            trackColor={{ false: '#767577', true: Colors.YELLOW + "90" }}
            thumbColor={secondaryView ? '#FFFFFF' : '#FFFFFF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleView}
            value={secondaryView}
          />
        </View>
      )
    });
  }, [navigation, workout, secondaryView]);


  const onCompleteWorkout = async () => {
    var date = new Date();
    date.setDate(date.getDate());
    const unixDate: any = Math.floor(new Date(date) / 1000)
    const programWorkouts = flattenWorkouts()

    try {

      const completedWorkout = {
        ...workout,
        isCompleted: true,
        completedAt: unixDate,
        user_id: currentUser?.id
      }

      delete completedWorkout.circuits


      if (nextWorkout?.id == workoutId) {
        alert("There was an error marking workout as completed!")
        return
      }

      if (workoutIndex < programWorkouts?.length - 1) {
        if (!nextWorkout?.id) {
          setCompletionValue(0)
          alert("Waiting for next workout to load!, Please go back and select workout again")
          return
        }

      }
      setisLoading(true)

      addCompletedWorkoutsApi(currentUser as CurrentUserFieldsFragment, completedWorkout as any)
        .then(async (isWorkoutAdded) => {

          if (isWorkoutAdded == true) {

            // ADD NEXT WORK TO INPRGRESS
            const programWorkouts = flattenWorkouts()

            if (workoutIndex < programWorkouts?.length - 1) {
              if (program?.id) {
                const data: InprogressEvent = {
                  __typename: "ProgramFacet",
                  archived: false,
                  description: currentFacet?.description || "",
                  equipmentNeeded: currentFacet?.equipmentNeeded || "",
                  goals: currentFacet?.goals || "",
                  id: currentFacet?.id,
                  imageUrl: currentFacet?.imageUrl || null,
                  live: program?.live,
                  name: currentFacet?.name || "",
                  order: currentFacet?.order || "",
                  program: {
                    __typename: "Program",
                    id: program?.id,
                    name: program?.name
                  },
                  videoUrl: currentFacet?.videoUrl || null,
                  workout: {
                    __typename: "Workout",
                    id: workout?.id,
                    week: workout?.week,
                    imageUrl: workout?.imageUrl || null,
                    duration: workout?.durationMinutes,
                    name: workout?.name,
                    metadata: workout,
                    completedAt: unixDate
                  },
                  nextWorkout: {
                    __typename: "Workout",
                    id: nextWorkout?.id,
                    week: nextWorkout?.week,
                    imageUrl: nextWorkout?.imageUrl || null,
                    duration: nextWorkout?.durationMinutes,
                    name: nextWorkout?.name,
                    metadata: nextWorkout
                  },
                  skillLevel: skillLevel,
                  user_id: currentUser?.id
                }

                const res = await addInProgressEventsApi(currentUser as CurrentUserFieldsFragment, data)

                alert(res == true ? "Worked added in Inprogress" : "There was an error addding workout to inprogress type ")
              }
            } else {
              // WHEN WORKOUT IS LAST ONE IN PRPGRA<M FACET

              const data: any = {
                __typename: "ProgramFacet",
                id: currentFacet?.id,
                program: {
                  __typename: "Program",
                  id: program?.id,
                },
                skillLevel: skillLevel
              }

              await removeInProgressEventsApi(currentUser as CurrentUserFieldsFragment, data)
            }

            setisLoading(false)
            navigation.navigate(AppRoutes.WORKOUT_RATING, { workoutId });
          } else {
            alert("There was an error marking workout as completed! type 2")
          }
        }).catch(console.error);

    } catch (error) {
      alert("There was an error addding workout to inprogress" + JSON.stringify(error))
      setisLoading(false)
    }
  }

  const EnableOnPress = walkthroughStep === 'Done'

  const renderStats = React.useMemo(() => {
    if (workout == null) {
      return null;
    }
    return (
      <View
        ref={workoutSummaryRef}
        style={styles.statesCard}
      >

        <View
          style={styles.statesCardRow}>

          <View style={styles.statesInnerCard}>
            <AppText style={{ color: 'white', fontSize: getFontSize(3.65), }}>Week:</AppText>
            <AppText style={{ color: 'white', fontSize: getFontSize(3.65), fontWeight: '700' }}>{workout.week}</AppText>
          </View>

          <View style={styles.line}></View>

          <View style={styles.statesInnerCard}>
            <AppText style={{ color: 'white', fontSize: getFontSize(3.65), }}>Day:</AppText>
            <AppText style={{ color: 'white', fontSize: getFontSize(3.65), fontWeight: '700' }}>{workout.order}</AppText>
          </View>

        </View>

        <View style={styles.lineHorizaontal}></View>

        <View
          style={styles.statesCardRow}>

          <View style={styles.statesInnerCard}>
            <AppText style={{ color: 'white', fontSize: getFontSize(3.65), }}>Blocks:</AppText>
            <AppText style={{ color: 'white', fontSize: getFontSize(3.65), fontWeight: '700' }}>{workout.circuits.length}</AppText>
          </View>

          <View style={styles.line}></View>

          <View style={styles.statesInnerCard}>
            <AppText style={{ color: 'white', fontSize: getFontSize(3.65), }}>Exercises:</AppText>
            <AppText style={{ color: 'white', fontSize: getFontSize(3.65), fontWeight: '700' }}>{sumBy(workout.circuits, item => item.exercises.length)}</AppText>
          </View>

          <View style={styles.line}></View>

          <View style={styles.statesInnerCard}>
            <AppText style={{ color: 'white', fontSize: getFontSize(3.65) }}>{shortDurationHumanizer(workout.durationMinutes * 1000 * 60)?.split(' ')[1]?.replace(",", "")}:</AppText>
            <AppText style={{ color: 'white', fontSize: getFontSize(3.65), fontWeight: '700', flex: 1 }}>{shortDurationHumanizer(workout.durationMinutes * 1000 * 60)?.split(' ')[0]}</AppText>
          </View>

        </View>

      </View>
    )
  }, [workout]);

  const renderedCircuits = React.useMemo(() => {
    return orderBy(compact(workout?.circuits), item => item.order, 'asc')
      .map((circuit, index) =>
        <WorkoutCircuit
          index={index}
          showHideRef={showHideRef}
          setRestRef={setRestRef}
          videoScrollRef={videoScrollRef}
          descRef={descRef}
          logSetWeightRef={logSetWeightRef}
          addModifySetRef={addModifySetRef}
          key={circuit.id}
          circuit={circuit}
          isExpanded={expandedCircuitId === circuit.id}
          setIsExpanded={setExpandedCircuitId}
          reloadSets={workoutQuery?.refetch} />
      )
  }, [workout, expandedCircuitId, workout?.circuits.flatMap(circuit => circuit.exercises.flatMap(exercise => exercise.exerciseSets.flatMap(item => item.id))).sort().join('-')]);


  const renderedSecondaryCircuits = React.useMemo(() => {
    return orderBy(compact(workout?.circuits), item => item.order, 'asc')
      .map((circuit, index) =>
        <WorkoutSecondaryCircuit
          index={index}
          showHideRef={showHideRef}
          setRestRef={setRestRef}
          videoScrollRef={videoScrollRef}
          descRef={descRef}
          logSetWeightRef={logSetWeightRef}
          addModifySetRef={addModifySetRef}
          key={circuit.id}
          circuit={circuit}
          isExpanded={expandedCircuitId === circuit.id}
          setIsExpanded={setExpandedCircuitId}
          reloadSets={workoutQuery?.refetch} />
      )
  }, [workout, expandedCircuitId, workout?.circuits.flatMap(circuit => circuit.exercises.flatMap(exercise => exercise.exerciseSets.flatMap(item => item.id))).sort().join('-')]);

  const CheckoutButton = () => {
    return (
      <View style={{
        width: 60,
        height: 60,
        backgroundColor: Colors.YELLOW,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <FontAwesome5 name='chevron-right' size={25} color={Colors.BLACK} />
      </View>
    );
  }

  return (
    <SafeView backgroundColor='black'>


      <KeyboardAwareScrollView
        ref={scrollRef}
        style={{ paddingTop: 10, paddingHorizontal: 10 }}
        scrollEnabled={EnableOnPress}
      >

        {renderStats}


        {workout == null ?
          <Spinner />
          :
          <>
            {secondaryView ?
              <>
                <View style={{ marginTop: 10 }}></View>
                {renderedSecondaryCircuits}
              </>
              :
              renderedCircuits
            }
          </>
        }
        {
          isLoading ?
            <ActivityIndicator
              size={'large'}
              color={"#FFFFFF"}
              style={{
                marginTop: 10,
                marginBottom: 20
              }} />
            :
            <>
              {checkIfWorkoutCompleted(completedWorkouts, workoutId) ?
                <View style={{ alignItems: 'center', paddingVertical: 10, marginBottom: 30 }}>
                  <AppText style={{ fontSize: 24, color: Colors.GREEN }}>Workout Completed</AppText>
                </View>
                :
                <>
                  {/* <View style={{ alignItems: 'center', marginTop: 30, width: '100%' }}> */}
                  {/* <AppText style={{ fontSize: 16, color: 'white' }}>To mark the workout as complete</AppText> */}
                  {/* <GestureRecognizer onSwipeRight={onCompleteWorkout}>
                    <Image source={iconSwipe} style={{ width: 203, height: 43, marginTop: 10 }} />
                     </GestureRecognizer> */}
                  {/* </View> */}

                  {/* <View ref={swiperef} style={{ paddingVertical: 15 }}> */}

                  {/* <Slider
                      style={{ width: '100%', borderRadius: 0, marginBottom: 20 }}
                      minimumValue={0}
                      step={1}
                      value={completionValue}
                      maximumValue={100}
                      onValueChange={val => {
                        setCompletionValue(val[0] as number);
                        if (val[0] >= 90) {
                          console.info("complete");
                          // onCompleteWorkout();
                        }
                      }}
                      onSlidingComplete={(val) => {
                        console.info("onSlidingComplete", val[0]);
                        if (val[0] >= 90) {
                          onCompleteWorkout();
                        }
                      }}

                      thumbImage={iconSwipeSmall}
                      minimumTrackTintColor={'black'}
                      thumbStyle={{ backgroundColor: 'black', width: 155, height: 32, justifyContent: 'center', borderRadius: 0 }}
                      trackStyle={{ height: 32 }}
                      hitSlop={{ left: 100, right: 100, top: 100, bottom: 100 }}
                      maximumTrackTintColor="#241F21"
                      trackHeight={32}
                    />
                  </View>
                  <View style={{ marginBottom: 50, }}></View> */}


                  <SwipeButton
                    containerStyles={{ borderRadius: 60, marginTop: 20 }}
                    height={60}
                    onSwipeSuccess={() => {
                      onCompleteWorkout()
                    }}
                    railBackgroundColor={Colors.BACKGROUND}
                    railBorderColor={Colors.BLACK}
                    railFillBorderColor={Colors.BLACK}
                    railStyles={{ borderRadius: 60, backgroundColor: 'rgba(0,0,0,0.7)' }}
                    thumbIconComponent={CheckoutButton}
                    // thumbIconImageSource={arrowRight}
                    thumbIconStyles={{ borderRadius: 60, borderWidth: 0 }}
                    thumbIconWidth={60}
                    title="Swipe to Complete"
                    titleColor={Colors.WHITE}
                    titleFontSize={16}
                    titleStyles={{ fontWeight: '500' }}

                  />

                  <View style={{ marginBottom: 50 }}></View>

                </>
              }
            </>
        }

        {isSimulator() &&
          <AppButton theme='yellow' onPress={() => EnableOnPress && navigation.navigate(AppRoutes.WORKOUT_RATING, { workoutId })}>Mock complete</AppButton>
        }

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
        />

        {/* <QuestionaireModal
          visible={questionaireModalVisible}
          onClose={() => setquestionaireModalVisible(true)}
          data={workout}
          onComplete={() => setquestionaireModalVisible(false)}
        /> */}
      </KeyboardAwareScrollView>
    </SafeView >
  )
}


const styles = StyleSheet.create({
  statesCard: {
    marginBottom: 8,
    borderColor: '#797979',
    borderWidth: 1,
    borderRadius: 8
  },
  statesCardRow: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  statesInnerCard: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5
  },
  line: {
    width: 1.5,
    height: '100%',
    backgroundColor: "#FFFFFF",
    marginHorizontal: 5
  },
  lineHorizaontal: {
    width: '94%',
    height: 1 / 2,
    backgroundColor: '#797979',
    alignSelf: 'center',
    marginVertical: 3
  },
})