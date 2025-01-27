import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View, ViewProps } from "react-native";
import { AppText } from '../../../shared/components/AppText';
import { Colors } from '../../../shared/Constants';
import { AppRoutes, NavigatorParams } from '../../../shared/Routing';
import { WorkoutsQuery } from '../../../types/gqlReactTypings.generated.d';
import { FavoriteButton } from './favoriteButton';
import { completedWorkoutsSelectors, useCompletedWorkoutsState } from '../../../states/completedWorkout';
import { checkIfWorkoutCompleted } from '../../../utils/myutil';
import useCompletedWorkoutApi from '../../../hooks/useCompletedWorkoutApi';
import FastImage from 'react-native-fast-image'

const iconTick = require(`../../../assets/images/icons/tick_green.png`);


interface Props extends ViewProps {
  workout: WorkoutsQuery['workouts'][0];
  day?: number;
  onFavorite: (workoutId: number) => void;
  hideBorder?: boolean;
  programWorkouts?: any;
  selectedFacetId?: any;
  skillLevel?: any;
}

export function WorkoutCard(props: Props) {
  const { workout, onFavorite, hideBorder, day, programWorkouts = [], selectedFacetId = null, skillLevel } = props;
  const navigation = useNavigation<NavigationProp<NavigatorParams>>();
  const completedWorkouts = useCompletedWorkoutsState(completedWorkoutsSelectors.completedWorkouts)
  const { removeCompletedWorksApi } = useCompletedWorkoutApi()
  const [isloading, setisloading] = useState(false)

  const handleMarkWorkoutAsIncomplete = async () => {
    try {
      setisloading(true)
      await removeCompletedWorksApi(workout as any)
      setisloading(false)
    } catch (error) {
      setisloading(false)
    }
  }

  return (
    <View key={workout.id}>
      <TouchableOpacity
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 20,
          width: '100%',
        }}
        onPress={() => {
          navigation.navigate(AppRoutes.WORKOUT_LISTING, {
            workoutId: workout.id,
            programWorkouts,
            selectedFacetId,
            skillLevel
          })
        }}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          <FastImage source={{ uri: workout.imageUrl, priority: FastImage.priority.high }} style={{ height: 80, width: 120, marginRight: 15, borderRadius: 5, backgroundColor: 'black' }} />
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <AppText style={{ color: Colors.YELLOW, fontSize: 18, lineHeight:22, marginTop: 8, marginBottom: 10, flexWrap: 'wrap', maxWidth: '100%' }}>{workout.name}</AppText>
            {day != null && <AppText style={{ color: 'white' }}>Day {day}</AppText>}
            <AppText style={{ color: '#aaa', lineHeight:16 }}>Duration {workout.durationMinutes} mins</AppText>
          </View>
        </View>

        {checkIfWorkoutCompleted(completedWorkouts, workout.id) &&
          <TouchableOpacity
            onLongPress={() => {
              handleMarkWorkoutAsIncomplete()
            }
            }
            disabled={isloading}
            hitSlop={{
              left: 10,
              top: 10,
              bottom: 10
            }}
            style={{
              height: 23,
              width: 23,
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {
              isloading ?
                <ActivityIndicator color={"#FFFFFF"} size={'small'} />
                :
                <Image source={iconTick} style={{ height: 20, width: 20, resizeMode: 'contain', }} />

            }
          </TouchableOpacity>
        }

        <FavoriteButton onPress={() => onFavorite(workout.id)} value={workout.isFavorited} />

      </TouchableOpacity>
      {hideBorder !== true &&
        <View style={{ backgroundColor: '#ffffff7f', height: 1 }} />
      }
    </View>
  );
}
