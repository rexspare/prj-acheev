import React, { useEffect, useState, useRef } from 'react';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeView } from '../../shared/components/SafeView';
import { ScrollView, Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { FavoriteModelType, SkillLevel, useFavoriteMutation, useProgramFacetQuery, useProgramQuery } from '../../types/gqlReactTypings.generated.d';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { compact, first, orderBy, startCase } from 'lodash';
import { ProgramFacetSummary } from './components/programFacetSummary';
import { AppText } from '../../shared/components/AppText';
import { AppInput, InputType } from '../../shared/components/AppInput';
import { ProgramWorkoutList } from './components/programWorkoutList';
import { AuthContext } from '../../shared/auth/Authentication';
import ObjectHash from 'object-hash';
import { Colors } from '../../shared/Constants';
import { ProgramFacetAddCalendar } from './components/programFacetAddCalendar';
import { ProgramListingCarousel } from './components/programListingCarousel';
import HighlightTooltip from 'react-native-highlight-tooltip';
import { getItem, setItem } from '../../services/asyncStorage';

const iconCalendarAdd = require('../../assets/images/icons/calendar_add.png');

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.PROGRAM_LISTING> {
}

export const ProgramListing: React.FC<Props> = ({ navigation, route }: Props) => {
  const { programId, selectedFacetId: defaultSelectedFacetId, skillLevel: defaultSkillLevel } = route.params;
  const { currentUser } = React.useContext(AuthContext);
  const programQuery = useProgramQuery({ variables: { programId } })
  const [skillLevel, setSkillLevel] = React.useState<SkillLevel | undefined | string>(currentUser?.skillLevel);
  const [selectedFacetId, setSelectedFacetId] = React.useState<number | undefined>(defaultSelectedFacetId);
  const [showCalendar, setShowCalendar] = React.useState<boolean>(false);

  // WALKTHROUGH
  const [tooltipText, setTooltipText] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [highlightRef, setHighlightRef] = useState(null);
  const [highlightVisible, setHighlightVisible] = useState(false);

  const [walkthroughStep, setwalkthroughStep] = useState("facets")

  // reference of components which you wanna highlight
  const scrollref = useRef<ScrollView>(null);
  const facetRef = useRef(null);
  const programCardRef = useRef(null);
  const infoIconRef = useRef(null);
  const heartIconRef = useRef(null);
  const textBubbleIconRef = useRef(null);
  const skillLevelRef = useRef(null);
  const workoutCardRef = useRef(null);

  const programFacetListingQuery = useProgramFacetQuery({ variables: { programFacetId: selectedFacetId ?? -1 }, skip: selectedFacetId == null })
  const [favoriteMutation] = useFavoriteMutation();


  useEffect(() => {
    if (defaultSkillLevel) {
      setSkillLevel(defaultSkillLevel)
    }
  }, [defaultSkillLevel])

  const program = React.useMemo(() => {
    return programQuery.data?.program;
  }, [programQuery]);

  const currentFacet = React.useMemo(() => {
    return programFacetListingQuery.data?.programFacet
  }, [ObjectHash(programFacetListingQuery.data?.programFacet ?? {})]);

  // WALKTHROUGH

  const handleAppWalkthrough = (reference: any, tipText: any, tipPosition: any) => {
    setHighlightRef(reference);
    setTooltipText(tipText);
    setTooltipPosition(tipPosition);
  };

  const handleWalkthroughSteps = () => {
    if (walkthroughStep === 'facets') {
      handleAppWalkthrough(
        programCardRef,
        `See program summary.`,
        'top');
      setwalkthroughStep('programcard');
    } else if (walkthroughStep === 'programcard') {
      handleAppWalkthrough(
        {
          reference: infoIconRef,
          style: {
            margin: 10,
          },
        },
        'See more information about the program.',
        'topLeft',
      );
      setwalkthroughStep('infoIcon');
    } else if (walkthroughStep === 'infoIcon') {
      handleAppWalkthrough(
        {
          reference: heartIconRef,
          style: {
            margin: 10,
          },
        },
        'Favorite the program for later.',
        'topLeft',
      );
      setwalkthroughStep('heartIcon');
    } else if (walkthroughStep === 'heartIcon') {
      handleAppWalkthrough(
        {
          reference: textBubbleIconRef,
          style: {
            margin: 10,
          },
        },
        'Rate and leave your feedback.',
        'topLeft',
      );
      setwalkthroughStep('textBubble');
    } else if (walkthroughStep === 'textBubble') {
      handleAppWalkthrough(
        skillLevelRef,
        'Select your skill level.',
        'top',
      );
      setwalkthroughStep('skillLevel');
    } else if (walkthroughStep === 'skillLevel') {
      if (Dimensions.get("screen").height < 870) {
        scrollref?.current?.scrollTo({ y: 100, animated: true });
      }
      setTimeout(() => {
        handleAppWalkthrough(
          workoutCardRef,
          'Jump into your workout.',
          'top',
        );
        setwalkthroughStep('workoutCard');
      }, 500);
    } else if (walkthroughStep === 'workoutCard') {
      setTimeout(async () => {
        setHighlightVisible(false);
        setwalkthroughStep('Done');
        await setItem("@WALKTHROUGH_SECOND_STEP", true)
      }, 100);
    }
  }

  useEffect(() => {
    initWalkthrough()
  }, [currentFacet]);


  const initWalkthrough = async () => {
    try {
      const res = await getItem("@WALKTHROUGH_SECOND_STEP", null)
      if (res == null) {
        if (currentFacet != null) {
          if (highlightVisible === false) {
            setTimeout(() => {
              setHighlightVisible(true);
              handleAppWalkthrough(facetRef, `Scroll horizontally to see facets.`, 'bottom');
            }, 2000);
          }
        }
      } else {
        setwalkthroughStep("Done")
      }
    } catch (error) {

    }
  }

  // END



  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: program?.name,
      headerRight: () => (
        <TouchableOpacity onPress={() => EnableOnPress && navigation.navigate(AppRoutes.PROGRAM_RATING, { programId: programId })} style={{ paddingRight: 10, height: 20 }}>
          <AppText style={{ color: Colors.YELLOW, fontSize: 16 }}>Rate</AppText>
        </TouchableOpacity>
      ),
    });
  }, [navigation, program]);

  React.useEffect(() => {
    setSelectedFacetId(defaultSelectedFacetId);
  }, [defaultSelectedFacetId]);

  const allFacetsOrdered = React.useMemo(() => {
    return orderBy(compact(programQuery.data?.program.programFacets).filter(item => !!item.live && !item.archived), item => item.order, 'asc');
  }, [programQuery.data?.program.programFacets]);


  React.useEffect(() => {
    if (selectedFacetId == null && allFacetsOrdered.length > 0) {
      setSelectedFacetId(first(allFacetsOrdered)?.id);
    }
  }, [allFacetsOrdered]);


  // console.info("is favorited ==>>", currentFacet, programFacetListingQuery.data?.programFacet);
  const EnableOnPress = walkthroughStep === 'Done'

  return (
    <SafeView backgroundColor='black'>
      <ScrollView scrollEnabled={EnableOnPress} ref={scrollref} style={{ paddingTop: 0, paddingHorizontal: 10 }}>
        {program == null ?
          <Spinner />
          :
          <>
            <ProgramListingCarousel
              facetRef={facetRef}
              selectedFacetId={selectedFacetId}
              setSelectedFacetId={setSelectedFacetId}
              allFacetsOrdered={allFacetsOrdered}
              program={program}
            />

            {currentFacet != null &&
              <ProgramFacetSummary
                programCardRef={programCardRef}
                infoIconRef={infoIconRef}
                heartIconRef={heartIconRef}
                textBubbleIconRef={textBubbleIconRef}
                navigation={navigation}
                programFacet={currentFacet}
                skillLevel={skillLevel}
                onFavorite={(facetId) => {
                  console.info("Facet id", facetId);
                  EnableOnPress &&
                    favoriteMutation({ variables: { modelId: `${facetId}`, modelType: FavoriteModelType.ProgramFacet } }).then(() => {
                      programFacetListingQuery?.refetch?.({ programFacetId: facetId });
                    });
                }}
                EnableOnPress={EnableOnPress}
              />
            }

            <View
              ref={skillLevelRef}
              style={{ paddingTop: 15, flexDirection: 'row', alignItems: 'center', flex: 1, maxWidth: '100%' }}>
              <AppText semiBold style={{ fontSize: 18, color: 'white', marginRight: 10 }}>Skill level:</AppText>
              <AppInput
                type={InputType.SELECT}
                wrapperStyle={{ maxWidth: '100%', flex: 1, marginHorizontal: undefined }}
                inputStyle={{ maxWidth: '100%' }}
                viewInputStyle={{ maxWidth: '100%' }}
                selectionItems={Object.values(SkillLevel).map(item => ({ label: startCase(item.toLowerCase()), value: item }))}
                selectPlaceholder={{ label: 'Select your skill level', value: -1 }}
                value={skillLevel}
                onChange={val => {
                  setSkillLevel(val as SkillLevel)
                }}
              />

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
              <AppText style={{ color: 'white', fontSize: 20 }} semiBold>Workouts</AppText>
              {true &&
                <TouchableOpacity onPress={() => EnableOnPress && setShowCalendar(true)}>
                  <Image source={iconCalendarAdd} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
              }
            </View>
            <View style={{ backgroundColor: '#ffffff7f', height: 1, marginTop: 10, marginRight: -20, marginBottom: 20 }} />

            {currentFacet != null && skillLevel != null &&
              <ProgramWorkoutList
                workoutCardRef={workoutCardRef}
                selectedFacetId={selectedFacetId}
                programFacet={currentFacet}
                skillLevel={skillLevel as SkillLevel}
                navigation={navigation}
                EnableOnPress={EnableOnPress}
              />
            }
          </>
        }
      </ScrollView>

      {currentFacet != null &&
        <ProgramFacetAddCalendar
          key={currentFacet.id}
          programFacetId={currentFacet.id}
          programId={currentFacet.program.id}
          modalProps={{ show: showCalendar, onCancel: () => setShowCalendar(false) }}
          onComplete={() => setShowCalendar(false)}
        />
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
    </SafeView>
  )
}