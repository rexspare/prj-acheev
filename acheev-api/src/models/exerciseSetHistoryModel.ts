import { Models } from "../shared/models";
import { BaseModel } from "./BaseModel";

export class ExerciseSetHistoryModel extends BaseModel {
  id!: number;
  programId!: number;
  programFacetId!: number;
  workoutId!: number;
  circuitId!: number;
  exerciseId!: number;
  exerciseSetId!: number;
  userId!: number;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.EXERCISE_SET_HISTORY.table;

  static relatedQueries = {};

  static relationMappings = () => ({});
}
