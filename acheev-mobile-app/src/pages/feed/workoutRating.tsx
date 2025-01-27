import React from 'react';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeView } from '../../shared/components/SafeView';
import { ScrollView, TouchableOpacity, View, } from 'react-native';
import { AppText } from '../../shared/components/AppText';
import { Colors } from '../../shared/Constants';
import Slider from '@react-native-community/slider';
import { RatingInput, RatingModelType, useSubmitRatingMutation } from '../../types/gqlReactTypings.generated.d';
import { formatGqlError, hookStateChangeInjector } from '../../shared/Utilities';
import { AppCard } from '../../shared/components/AppCard';
import { AppButton } from '../../shared/components/AppButton';
import { gql } from '@apollo/client';

gql`
  mutation SubmitRating($ratingInput: RatingInput!) {
    submitRating(ratingInput: $ratingInput)
  }
`

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.WORKOUT_RATING> {
}


export const WorkoutRating: React.FC<Props> = ({ route, navigation }: Props) => {
  const { workoutId } = route.params;
  const [ratingInput, setRatingInput] = React.useState<RatingInput>({
    modelId: `${workoutId}`, modelType: RatingModelType.Workout,
    ratingChallenge: 50,
    ratingPerformance: 50,
    ratingEffort: 50,
  });
  const [submitRatingMutation] = useSubmitRatingMutation({ variables: { ratingInput } });
  const change = hookStateChangeInjector(ratingInput, setRatingInput);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Rate Workout",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 10, height: 20 }}>
          <AppText style={{ color: Colors.YELLOW, fontSize: 16 }}>Skip</AppText>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderSlider = React.useCallback((title: string, ratingInputKey: keyof Pick<RatingInput, 'ratingChallenge' | 'ratingEffort' | 'ratingPerformance'>, minVal: number = 1, maxVal: number = 100) => {
    return (
      <>
        <AppCard style={{ backgroundColor: Colors.BACKGROUND, borderRadius: 5, marginBottom: 30, padding: 20 }}>
          <AppText style={{ color: 'white', fontSize: 18, marginBottom: 20 }}>{title}</AppText>
          <Slider
            style={{ width: '100%', height: 30, flex: 1, borderRadius: 10 }}
            minimumValue={minVal}
            step={1}
            maximumValue={maxVal}
            value={ratingInput[ratingInputKey]}
            onValueChange={change(ratingInputKey)}
            minimumTrackTintColor={Colors.YELLOW}
            maximumTrackTintColor="rgba(242, 213, 195, 0.44);"
            thumbTintColor={Colors.YELLOW}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <AppText style={{ color: 'white', fontSize: 20, flex: 1 }}>{minVal}</AppText>
            <AppText style={{ color: Colors.YELLOW, fontSize: 20, flex: 1, textAlign: 'center' }}>{ratingInput[ratingInputKey]}</AppText>
            <AppText style={{ color: 'white', fontSize: 20, flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', textAlign: 'right' }}>{maxVal}</AppText>
          </View>
        </AppCard>
      </>
    )
  }, [ratingInput]);

  const onSubmit = () => {
    submitRatingMutation().then(() => {
      navigation.goBack();
    }).catch(err => {
      console.error(err);
      window.alert(`Failed to submit.  Please try again.  ${formatGqlError(err)}`);
    });
  }


  return (
    <SafeView backgroundColor='black'>
      <ScrollView style={{ paddingTop: 25, paddingHorizontal: 10 }}>

        {renderSlider("How challenging was it?", 'ratingChallenge')}

        {renderSlider("How well did you perform?", 'ratingPerformance')}

        {renderSlider("How would you rate your overall work effort?", 'ratingEffort')}

        <AppButton theme='yellow' style={{ marginHorizontal: 50 }} onPress={onSubmit}>Submit</AppButton>
      </ScrollView>
    </SafeView >
  )
}