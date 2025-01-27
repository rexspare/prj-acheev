import { Models } from '../shared/models';
import { BaseModel } from './BaseModel';

export class ExerciseModel extends BaseModel {
  id!: number;
  templateId?: number;
  programId!: number;
  programFacetId!: number;
  workoutId!: number;
  circuitId!: number;
  userId?: string;

  archived!: boolean;
  startedAt?: Date;
  completedAt?: Date;

  name!: string;
  description!: string;
  restDurationSeconds!: number;
  order!: number;
  videoUrl!: string;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.EXERCISE.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
