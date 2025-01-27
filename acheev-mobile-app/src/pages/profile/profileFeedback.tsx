import React from 'react';
import { SafeView } from '../../shared/components/SafeView';
import type { StackScreenProps } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { AuthContext } from '../../shared/auth/Authentication';
import { AppInput, InputType } from '../../shared/components/AppInput';
import { gql } from '@apollo/client';
import { FeedbackInput, useSubmitFeedbackMutation } from '../../types/gqlReactTypings.generated.d';
import { hookStateChangeInjector, testingOnlyData } from '../../shared/Utilities';
import { AppButton } from '../../shared/components/AppButton';

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

gql`
  mutation SubmitFeedback($feedbackInput: FeedbackInput!) {
    submitFeedback(feedbackInput: $feedbackInput)
  }
`

enum Categories {
  IMPROVEMENTS = 'Improvements',
  SUGGESTION = 'Suggestion',
  EXPERIENCE = 'Experience',
}

export const ProfileFeedback: React.FC<Props> = ({ route, navigation }: Props) => {
  const [input, setInput] = React.useState<FeedbackInput>({
  });
  const [submitFeedbackMutation] = useSubmitFeedbackMutation({ variables: { feedbackInput: input } });

  const change = hookStateChangeInjector(input, setInput);

  const onSave = () => {
    submitFeedbackMutation().then(() => {
      navigation.goBack();
    }).catch(err => {
      window.alert("Failed to submit feedback, please try again");
      console.error(err);
    })
  }

  return (
    <>
      <SafeView backgroundColor={'black'} padded={true} scroll={true} style={{
        paddingTop: 10,
      }}>


        <AppInput type={InputType.SELECT} selectPlaceholder={{ value: 'Category', label: 'Category' }}
          selectionItems={Object.entries(Categories).map(([key, val]) => ({ label: val, value: val }))}
          value={input.category} onChange={change('category')} />

        <AppInput type={InputType.TEXT} multiline={true} wrapperStyle={{ height: 100 }} value={input.content} onChange={change('content')} placeholder='Write your feedback' />

        <AppButton theme='yellow' style={{ minWidth: 220, marginTop: 20 }} onPress={onSave}>Submit</AppButton>

      </SafeView>
    </>
  );
}