import React from 'react';
import { Platform, TextInput, useColorScheme, ViewProps, View } from "react-native";
import { AppText } from '../../../shared/components/AppText';
import { Colors } from '../../../shared/Constants';
import { hookStateChangeInjector } from '../../../shared/Utilities';
import { ExerciseSet, ExerciseSetInput, WeightUnit, useCreateOrModifyExerciseSetMutation, } from '../../../types/gqlReactTypings.generated.d';
import { AuthContext } from '../../../shared/auth/Authentication';

interface Props extends ViewProps {
  set: Pick<ExerciseSet, 'id' | 'repCount' | 'durationSeconds' | 'weight' | 'distance' | 'percentageMax' | 'repsAvailable' | 'exerciseId' | 'weightRelative' | 'maxPercAvailable'>;
  isCompleted: boolean;
  reloadSets?: () => void;
  userWeight?: number;
}

export const WorkoutCircuitInlineSetEditor: React.FC<Props> = ({
  set,
  isCompleted,
  userWeight,
  reloadSets
}: Props) => {
  const useReps = set.repCount != null && set.repCount > 0;
  const useDistance = set?.repsAvailable  // ON ADMIN FRONT END "use Distance" uses this field "repsAvailable"
  const bodyWeight = set?.weightRelative  // ON ADMIN FRONT END "Body Weight" uses this field "weightRelative"
  const useMaxPerc = set?.maxPercAvailable

  const [input, setInput] = React.useState<ExerciseSetInput>({
    repCount: set.repCount,
    durationSeconds: set.durationSeconds,
    weight: set.weight,
    distance: set.distance,
    percentageMax: set.percentageMax,
  })
  const theme = useColorScheme()
  const { currentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    setInput({
      repCount: set.repCount,
      durationSeconds: set.durationSeconds,
      weight: set.weight,
      distance: set.distance,
      percentageMax: set.percentageMax
    })
  }, [set]);

  const [modifySetMutation] = useCreateOrModifyExerciseSetMutation();

  const change = hookStateChangeInjector(input, setInput);

  const input1Val = `${input.repCount ?? input.durationSeconds}`;
  const input2Val = useDistance ? `${input.distance ?? '0'}` : `${input.weight}`;
  const input3Val = `${input.percentageMax ?? '0'}`;


  const maybeSave = () => {
 
    if (
      input.repCount !== set.repCount ||
      input.durationSeconds !== set.durationSeconds ||
      input.weight !== set.weight ||
      input.distance !== set.distance ||
      input.percentageMax !== set.percentageMax
    ) {

      // Change occured
      modifySetMutation({ variables: { createOrModifyExerciseSetInput: { ...input, exerciseId: set.exerciseId, exerciseSetId: set.id, } } })
        .then(reloadSets)
        .catch((error) => {
          console.error(error)
        });
    }
  }


  return (
    <>
      <AppText style={{ color: 'rgba(255,255,255, .75)' }}>{useReps ? 'Reps' : 'Time'}: </AppText>
      <TextInput
        style={{
          minWidth: 10,
          color: isCompleted ? Colors.GREEN : Colors.YELLOW,
          lineHeight: 16,
          ...(Platform.OS != 'ios' && { top: -5 })
        }}
        value={input1Val}
        selection={{ start: input1Val.length }}
        keyboardType='numeric'
        returnKeyType="done"
        onChangeText={val => {
          let newVal = parseInt(val);
          if (isNaN(newVal)) {
            newVal = 0;
          }
          change(useReps ? 'repCount' : 'durationSeconds')(newVal);
        }}
        onBlur={maybeSave}
        keyboardAppearance={Platform.OS == 'ios' ? 'dark' : theme == 'dark' ? 'dark' : 'light'}
        allowFontScaling={false}
      />
      <AppText style={{ color: isCompleted ? Colors.GREEN : Colors.YELLOW }}>{useReps ? '' : 's'}</AppText>

      <AppText style={{ color: 'rgba(255,255,255, .75)' }}> | {useDistance ? "Distance: " : "Weight: "}</AppText>
      <TextInput
        style={{
          minWidth: 10,
          color: isCompleted ? Colors.GREEN : Colors.YELLOW,
          ...(Platform.OS != 'ios' && { top: -5 })
        }}
        keyboardType='numeric'
        value={input2Val}
        returnKeyType="done"
        selection={{ start: input2Val.length }}
        onChangeText={val => {
          let newVal = parseFloat(val);
          if (isNaN(newVal)) {
            newVal = 0;
          }
          change(useDistance ? 'distance' : 'weight')(newVal);
        }}
        onBlur={maybeSave}
        keyboardAppearance={Platform.OS == 'ios' ? 'dark' : theme == 'dark' ? 'dark' : 'light'}
        allowFontScaling={false}
      />

      {(!useDistance && bodyWeight) &&
        <AppText
          style={{ color: isCompleted ? Colors.GREEN : Colors.YELLOW, opacity: .7 }}> ({userWeight != null ? (Math.round(userWeight * parseFloat(input2Val))) + ` ${currentUser?.weightUnit === WeightUnit.Kilos ? 'kg' : 'lbs'}` : 'body weight'})</AppText>}

      {
        useMaxPerc &&
        <>
          <AppText style={{ color: 'rgba(255,255,255, .75)' }}> | {"%Max: "}</AppText>
          <TextInput
            style={{
              minWidth: 10,
              color: isCompleted ? Colors.GREEN : Colors.YELLOW,
              ...(Platform.OS != 'ios' && { top: -5 })
            }}
            keyboardType='numeric'
            value={input3Val}
            returnKeyType="done"
            selection={{ start: input3Val.length }}
            onChangeText={val => {
              let newVal = parseFloat(val);
              if (isNaN(newVal)) {
                newVal = 0;
              }
              change('percentageMax')(newVal);
            }}
            onBlur={maybeSave}
            keyboardAppearance={Platform.OS == 'ios' ? 'dark' : theme == 'dark' ? 'dark' : 'light'}
            allowFontScaling={false}
          />
        </>
      }
    </>
  )
}