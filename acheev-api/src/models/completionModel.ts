import { Models } from '../shared/models';
import { BaseModel } from './BaseModel';

export class CompletionModel extends BaseModel {
  id!: number;
  userId!: string;

  modelType!: string;
  modelId!: number;
  parentModelType?: string;
  parentModelId?: number;

  archived!: boolean;
  completedAt!: Date
  startedAt?: Date
  notes?: string;

  createdAt!: Date;
  updatedAt!: Date;

  static tableName = Models.COMPLETION.table;

  static relatedQueries = {

  }

  static relationMappings = () => ({
  })
}
