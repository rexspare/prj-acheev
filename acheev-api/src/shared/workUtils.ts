import { sum } from "lodash";
import { ExerciseModel } from "../models/exerciseModel";
import { ExerciseSetModel } from "../models/exerciseSetModel";

export const calculateWorkoutDurationMinutes = async (workoutId: number) => {
  const exerciseSets = await ExerciseSetModel.query().where({ workoutId, archived: false });
  const exercises = await ExerciseModel.query().where({ workoutId, archived: false });
  const exercisesMappedById = exercises.reduce<{ [key: string]: ExerciseModel }>((acc, item) => ({ ...acc, [item.id]: item }), {});
  return Math.round(sum(exerciseSets.map(item => item.durationSeconds + (exercisesMappedById[item.exerciseId]?.restDurationSeconds ?? 0))) / 60);
}