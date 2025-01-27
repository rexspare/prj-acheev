import { Models } from '../shared/models';
import { WeightUnit } from '../types/gqlTypings.generated';
import { BaseModel } from './BaseModel';

export class ExerciseSetModel extends BaseModel {
  id!: number;
  templateId?: number;
  programId!: number;
  programFacetId!: number;
  workoutId!: number;
  circuitId!: number;
  exerciseId!: number;
  userId?: string;

  order!: number;
  durationSeconds!: number;
  repCount?: number;
  weight!: number;
  weightRelative!: boolean;
  weightUnit!: WeightUnit;
  distance?: number;
  repsAvailable!: boolean;
  maxPercAvailable!: Boolean
  percentageMax?: number;

  archived!: boolean;
  startedAt?: Date;
  completedAt?: Date;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.EXERCISE_SET.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
