import { Models } from '../shared/models';
import { BaseModel } from './BaseModel';

export class RatingModel extends BaseModel {
  id!: number;
  userId!: string;

  modelType!: string;
  modelId!: string;

  ratingChallenge?: number
  ratingChallengeScale!: number
  ratingPerformance?: number
  ratingPerformanceScale!: number
  ratingEffort?: number
  ratingEffortScale!: number
  ratingOverall?: number
  ratingOverallScale!: number

  experiencedImprovement?: boolean;

  notes?: string;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.RATING.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
