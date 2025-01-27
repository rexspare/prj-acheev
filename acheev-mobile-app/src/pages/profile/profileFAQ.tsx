import React from 'react';
import { SafeView, } from '../../shared/components/SafeView';
import type { StackScreenProps } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { AuthContext } from '../../shared/auth/Authentication';
import { AppText } from '../../shared/components/AppText';
import { TouchableOpacity, Image, View } from 'react-native';
import { AppDivider } from '../../shared/components/AppDivider';

const iconUpArrow = require(`../../assets/images/icons/up_arrow.png`);
const iconDownArrow = require(`../../assets/images/icons/down_arrow.png`);


interface Props extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

export const ProfileFAQ: React.FC<Props> = ({ route, navigation }: Props) => {

  const [expandedIndices, setExpandedIndices] = React.useState<number[]>([]);

  return (
    <>
      <SafeView backgroundColor={'black'} padded={true} scroll={true} style={{
        paddingTop: 20,
      }}>
        {FAQS.map((item, index) => {
          const isExpanded = expandedIndices.includes(index);
          return (
            <View key={index} style={{ backgroundColor: '#241F21', borderRadius: 5, padding: 20, marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppText style={{ color: 'white', fontSize: 16, flex: 1 }}>{item.question}</AppText>
                <TouchableOpacity
                  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  onPress={() => isExpanded ? setExpandedIndices(expandedIndices.filter(item => item !== index)) : setExpandedIndices([...expandedIndices, index])}>
                  <Image source={isExpanded ? iconUpArrow : iconDownArrow} style={{ width: 18, height: 10, resizeMode: 'contain', marginLeft: 20, marginRight: 0 }} />
                </TouchableOpacity>
              </View>
              {isExpanded && (
                <View style={{ marginTop: 5 }}>
                  <AppDivider style={{ marginBottom: 10 }} />
                  <AppText style={{ color: 'white', fontSize: 14 }}>{item.answer}</AppText>

                </View>
              )}
            </View>
          )
        })}

      </SafeView>
    </>
  );
}

const FAQS = [
  {
    question: 'How do I know the best skill level for myself?',
    answer: 'Use your best judgement, we’ve done our best to include the fundamentals for even the most advanced programs, understanding that even elite athletes may benefit from the basics and fundamentals.'
  },
  {
    question: 'What if I don’t have the equipment to perform the exercises?',
    answer: 'If you don’t have the equipment to perform the specific exercise, find a substitute exercise that applies force in the same direction, or an exercise which woks the same muscle group.'
  },
  {
    question: 'Am I supposed to complete all the exercises in the circuit before returning back to the first exercise?',
    answer: 'Yes, the workouts have been specifically designed to be done in the fashion presented, though we understand not everyone will have the luxury to do them in that way. Feel free to break the circuits up in the best way you can.'
  },
  {
    question: 'What if I’m not in the season specified for the program?',
    answer: 'It may not be the best program for you at the time. If you’re new to strength training, always start with off season, to develop a proper foundation of strength and skills.'
  },

]