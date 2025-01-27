import { Models } from '../shared/models';
import { BaseModel } from './BaseModel';

export class CircuitModel extends BaseModel {
  id!: number;
  templateId?: number;
  programId!: number;
  programFacetId!: number;
  workoutId!: number;
  userId?: string;

  archived!: boolean;
  startedAt?: Date;
  completedAt?: Date;

  name!: string;
  order!: number;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.CIRCUIT.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
