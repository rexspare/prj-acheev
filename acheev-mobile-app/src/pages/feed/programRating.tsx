import React from 'react';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeView } from '../../shared/components/SafeView';
import { ScrollView, TouchableOpacity, View, StyleSheet, Switch } from 'react-native';
import { AppText } from '../../shared/components/AppText';
import { Colors } from '../../shared/Constants';
import Slider from '@react-native-community/slider';
import { RatingInput, RatingModelType, useSubmitRatingMutation } from '../../types/gqlReactTypings.generated.d';
import { formatGqlError, hookStateChangeInjector } from '../../shared/Utilities';
import { AppCard } from '../../shared/components/AppCard';
import { AppButton } from '../../shared/components/AppButton';
import { gql } from '@apollo/client';
import { AppInput, InputType } from '../../shared/components/AppInput';

gql`
  mutation SubmitRating($ratingInput: RatingInput!) {
    submitRating(ratingInput: $ratingInput)
  }
`

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.PROGRAM_RATING> {
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.BACKGROUND, borderRadius: 5, marginBottom: 30, padding: 20
  },
  cardTitle: {
    color: 'white', fontSize: 18, marginBottom: 20
  }
});

export const ProgramRating: React.FC<Props> = ({ route, navigation }: Props) => {
  const { programId } = route.params;
  const [ratingInput, setRatingInput] = React.useState<RatingInput>({
    modelId: `${programId}`, modelType: RatingModelType.Program,
    ratingOverall: 3,
    ratingChallenge: 3,
    experiencedImprovement: true
  });
  const [submitRatingMutation] = useSubmitRatingMutation({ variables: { ratingInput } });
  const change = hookStateChangeInjector(ratingInput, setRatingInput);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Rate Program",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 10, height: 20 }}>
          <AppText style={{ color: Colors.YELLOW, fontSize: 16 }}>Skip</AppText>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderSlider = React.useCallback((title: string, ratingInputKey: keyof Pick<RatingInput, 'ratingChallenge' | 'ratingOverall' | 'ratingEffort' | 'ratingPerformance'>, minVal: number = 1, maxVal: number = 100) => {
    return (
      <>
        <AppCard style={[styles.card]}>
          <AppText style={styles.cardTitle}>{title}</AppText>
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

        {renderSlider("How would you rate the program?", 'ratingOverall', 1, 5)}

        {renderSlider("How challenging was the program for you?", 'ratingChallenge', 1, 5)}

        <AppCard style={[styles.card]}>
          <AppText style={[styles.cardTitle, { textAlign: 'center' }]}>Did you experience any improvement in your sport or body?</AppText>

          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <AppText style={{ color: 'white', fontSize: 18, opacity: !ratingInput.experiencedImprovement ? 1 : .5 }}>No</AppText>
            <Switch value={ratingInput.experiencedImprovement}
              onValueChange={val => {
                change('experiencedImprovement')(val);
              }}
              style={{ marginHorizontal: 10 }}
            />
            <AppText style={{ color: 'white', fontSize: 18, opacity: ratingInput.experiencedImprovement ? 1 : .5 }}>Yes</AppText>
          </View>
        </AppCard>


        <AppCard style={[styles.card]}>
          <AppText style={styles.cardTitle}>Any other feedback?</AppText>
          <AppInput type={InputType.TEXT} multiline={true} wrapperStyle={{ height: 100, maxWidth: '100%' }} inputStyle={{ maxWidth: '100%' }} value={ratingInput.notes} onChange={change('notes')} placeholder='Your opinion will help us grow and serve you better.' />
        </AppCard>

        <AppButton theme='yellow' style={{ marginHorizontal: 50 }} onPress={onSubmit}>Submit</AppButton>
      </ScrollView>
    </SafeView >
  )
}