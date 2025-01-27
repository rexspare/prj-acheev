import { Models } from '../shared/models';
import { SkillLevel } from '../types/gqlTypings.generated';
import { BaseModel } from './BaseModel';

export class WorkoutModel extends BaseModel {
  id!: number;
  templateId?: number;
  programId!: number;
  programFacetId!: number;
  userId?: string;
  skillLevel!: SkillLevel;

  live!: boolean;
  archived!: boolean;
  startedAt?: Date;
  completedAt?: Date;

  name!: string;
  imageUrl!: string;
  week!: number;
  order!: number;

  createdAt!: Date;
  updatedAt!: Date;

  // Resolved
  isFavorited?: boolean;

  static tableName = Models.WORKOUT.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
